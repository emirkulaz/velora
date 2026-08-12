from app.config import Settings
from app.providers.base import RecognitionProvider
from app.providers.mock_provider import DevelopmentMockProvider
from app.providers.yolo_provider import YoloOcrProvider


def build_provider(settings: Settings) -> RecognitionProvider:
    provider_name = settings.recognition_provider.lower().strip()

    if provider_name == "mock":
        if settings.recognition_env == "production" or not settings.allow_mock_provider:
            raise RuntimeError(
                "Mock recognition provider is disabled outside development."
            )
        return DevelopmentMockProvider()

    if provider_name in {"yolo", "yolo_ocr"}:
        return YoloOcrProvider(settings.yolo_model_path)

    raise ValueError(f"Unknown recognition provider: {provider_name}")
