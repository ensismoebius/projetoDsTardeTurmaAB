from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_nonexistent_user():
    response = client.delete("/api/users/999999")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data or "error" in data
