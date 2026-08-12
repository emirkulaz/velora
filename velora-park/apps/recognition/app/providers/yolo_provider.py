"""Placeholder for a future YOLO + OCR provider."""

from app.providers.base import RecognitionProvider, RecognitionResult
import numpy as np


class YoloOcrProvider(RecognitionProvider):
    name = "yolo_ocr"

    def __init__(self, model_path: str) -> None:
        if not model_path:
            raise ValueError("YOLO_MODEL_PATH is required for yolo_ocr provider.")
        self.model_path = model_path

    def recognize(
        self,
        image_bgr: np.ndarray,
        *,
        country_code: str,
    ) -> RecognitionResult:
        raise NotImplementedError(
            "Real YOLO/OCR provider is not wired yet. "
            "Set RECOGNITION_PROVIDER=mock in development."
        )
