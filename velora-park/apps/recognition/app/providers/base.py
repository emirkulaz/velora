from abc import ABC, abstractmethod
from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class RecognitionResult:
    plate_text: str
    confidence: float
    country_code: str
    provider: str
    is_mock: bool
    processing_duration_ms: int
    plate_bbox: tuple[int, int, int, int] | None = None


class RecognitionProvider(ABC):
    name: str

    @abstractmethod
    def recognize(
        self,
        image_bgr: np.ndarray,
        *,
        country_code: str,
    ) -> RecognitionResult:
        raise NotImplementedError
