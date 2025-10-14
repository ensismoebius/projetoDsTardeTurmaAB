import copy
import pytest
from fastapi.testclient import TestClient

# Ajuste o caminho para importar seu app e o fake_db conforme seu projeto
from app.main import app  
from app.db import fake_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_fake_db():
    """
    Reseta o estado do fake_db antes de cada teste para evitar efeitos colaterais.
    """
    original_data = copy.deepcopy(fake_db.artists)
    yield
    fake_db.artists = original_data

def test_get_users():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_artist_found():
    response = client.get("/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1

def test_get_artist_not_found():
    response = client.get("/9999")
    # Seu backend retorna 200 e corpo vazio (null)
    assert response.status_code == 200
    assert response.text == "null"

def test_create_artist():
    new_artist = {"name": "Test Artist"}
    response = client.post("/", json=new_artist)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["name"] == new_artist["name"]

def test_update_artist_found():
    update_data = {"name": "Updated Name"}
    response = client.put("/1", json=update_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Artist updated"}

def test_update_artist_not_found():
    update_data = {"name": "Updated Name"}
    response = client.put("/9999", json=update_data)
    assert response.status_code == 200
    assert "error" in response.json()

def test_delete_artist_found():
    response = client.delete("/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Artist deleted"}

def test_delete_artist_not_found():
    response = client.delete("/9999")
    assert response.status_code == 200
    assert "error" in response.json()