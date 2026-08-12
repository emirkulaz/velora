import hashlib
import time

import numpy as np

from app.providers.base import RecognitionProvider, RecognitionResult


class DevelopmentMockProvider(RecognitionProvider):
    """
    Explicit development mock.

    Results are clearly labeled as mock and must never be presented
    as real plate recognition output in production UIs.
    """

    name = "development_mock"

    def recognize(
        self,
        image_bgr: np.ndarray,
        *,
        country_code: str,
    ) -> RecognitionResult:
        started = time.perf_counter()
        digest = hashlib.sha1(image_bgr.tobytes()[:4096]).hexdigest()[:6].upper()
        plate_text = f"MOCK-{digest}"
        # Deterministic pseudo-confidence from image bytes.
        confidence = 0.55 + (int(digest[:2], 16) % 40) / 100
        elapsed_ms = int((time.perf_counter() - started) * 1000)
        h, w = image_bgr.shape[:2]
        bbox = (int(w * 0.25), int(h * 0.35), int(w * 0.75), int(h * 0.55))
        return RecognitionResult(
            plate_text=plate_text,
            confidence=min(confidence, 0.94),
            country_code=country_code.upper(),
            provider=self.name,
            is_mock=True,
            processing_duration_ms=max(elapsed_ms, 1),
            plate_bbox=bbox,
        )
