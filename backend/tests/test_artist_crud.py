import uuid
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def make_artist_payload():
    """
    Gera um payload válido e único para criação de artista.
    """
    return {
        "email": f"artist_{uuid.uuid4().hex[:6]}@example.com",
        "username": f"art_{uuid.uuid4().hex[:4]}",
        "name": "Artist Test",
        "password_hash": "senha",
        "latitude": 0.0,
        "longitude": 0.0,
        "type": "artist",
        "created_at": "2025-01-01"
    }
def test_create_and_get_artist():
    """
    Testa criação e leitura de artista.
    """
    payload = make_artist_payload()

    # CREATE
    create_res = client.post("/api/artists/", json=payload)
    assert create_res.status_code == 200, f"Erro ao criar artista: {create_res.text}"

    artist_id = create_res.json()["id"]
    assert isinstance(artist_id, int)

    # GET
    get_res = client.get(f"/api/artists/{artist_id}")
    assert get_res.status_code == 200, f"Erro ao buscar artista: {get_res.text}"
    assert get_res.json()["id"] == artist_id
