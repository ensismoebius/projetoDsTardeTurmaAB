from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_music():
    music = {
        "title": "Balada Nova",
        "artist_id": 1,
        "duration": 200
    }

    response = client.post("/api/musics/", json=music)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Balada Nova"
    assert data["artist_id"] == 1
    assert "id" in data
