import time
from typing import Annotated

import cv2
import httpx
import numpy as np
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, Field

from app.config import get_settings
from app.providers.factory import build_provider

settings = get_settings()
provider = build_provider(settings)

app = FastAPI(
    title="Velora Park Recognition",
    version="0.1.0",
    description="Plate recognition service with swappable providers.",
)


class HealthResponse(BaseModel):
    service: str
    status: str
    timestamp: str
    version: str
    provider: str
    provider_is_mock: bool


class RecognizeResponse(BaseModel):
    plate_text: str
    confidence: float
    country_code: str
    provider: str
    is_mock: bool = Field(
        description="True when DevelopmentMockProvider produced this result."
    )
    processing_duration_ms: int
    plate_bbox: tuple[int, int, int, int] | None = None
    ingest: dict | None = None


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        service="velora-park-recognition",
        status="ok",
        timestamp=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        version="0.1.0",
        provider=provider.name,
        provider_is_mock=provider.name == "development_mock",
    )


@app.post("/v1/recognize", response_model=RecognizeResponse)
async def recognize(
    file: Annotated[UploadFile, File(...)],
    country_code: Annotated[str, Form()] = settings.default_country_profile,
    camera_id: Annotated[str | None, Form()] = None,
    direction: Annotated[str, Form()] = "ENTRY",
    ingest: Annotated[bool, Form()] = False,
) -> RecognizeResponse:
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty upload.")

    image = cv2.imdecode(np.frombuffer(content, dtype=np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise HTTPException(status_code=400, detail="Unsupported image format.")

    result = provider.recognize(image, country_code=country_code)

    ingest_payload: dict | None = None
    if ingest:
        if not camera_id:
            raise HTTPException(
                status_code=400,
                detail="camera_id is required when ingest=true.",
            )
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                f"{settings.api_callback_base_url.rstrip('/')}/events/ingest",
                headers={"x-recognition-token": settings.recognition_ingest_token},
                json={
                    "cameraId": camera_id,
                    "plateText": result.plate_text,
                    "direction": direction,
                    "confidence": result.confidence,
                    "countryCode": result.country_code,
                    "processingDurationMs": result.processing_duration_ms,
                    "provider": result.provider,
                },
            )
            if response.status_code >= 400:
                raise HTTPException(
                    status_code=502,
                    detail=f"API ingest failed: {response.text}",
                )
            ingest_payload = response.json()

    return RecognizeResponse(
        plate_text=result.plate_text,
        confidence=result.confidence,
        country_code=result.country_code,
        provider=result.provider,
        is_mock=result.is_mock,
        processing_duration_ms=result.processing_duration_ms,
        plate_bbox=result.plate_bbox,
        ingest=ingest_payload,
    )
