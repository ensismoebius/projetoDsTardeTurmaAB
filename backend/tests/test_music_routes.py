from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_musics():
    response = client.get("/api/musics/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_music():
    # Certifique-se de que artist_id 1 existe ou crie dinamicamente
    new_music = {
        "title": "Imagine",
        "artist_id": 1,
        "duration": 200
    }
    response = client.post("/api/musics/", json=new_music)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Imagine"
    assert "id" in data

def test_get_specific_music():
    response = client.get("/api/musics/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
