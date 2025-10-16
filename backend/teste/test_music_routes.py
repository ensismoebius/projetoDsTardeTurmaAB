from fastapi.testclient import TestClient
from app.main import app  # importa a aplicação FastAPI

client = TestClient(app)

def test_get_all_musics():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_music():
    new_music = {"title": "Imagine"}
    response = client.post("/", json=new_music)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Imagine"
    assert "id" in data

def test_get_specific_music():
    response = client.get("/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1