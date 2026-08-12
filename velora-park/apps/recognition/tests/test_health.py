from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_reports_mock_provider() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["service"] == "velora-park-recognition"
    assert body["status"] == "ok"
    assert body["provider_is_mock"] is True
