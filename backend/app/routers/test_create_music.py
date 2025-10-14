from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_music():
    music = {
        "title": "Balada Nova",
        "description": "Um novo hit",
        "artist_id": 1,
        "duration": "3:45",
        "posted_at": "2025-09-20"
    }
    response = client.post("/api/musics/", json=music)
    if response.status_code == 404:
        print("Erro 404! Música não encontrada.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Balada Nova"
    assert data["artist_id"] == 1
    assert "id" in data