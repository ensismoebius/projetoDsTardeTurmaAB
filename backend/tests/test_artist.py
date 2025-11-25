import uuid
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


# ---------------------------
#  Helper: Factory de artista
# ---------------------------
def make_artist(**overrides):
    """
    Gera um payload de artista com dados únicos.
    """
    base = {
        "email": f"artist_{uuid.uuid4().hex[:6]}@gmail.com",
        "username": f"art_{uuid.uuid4().hex[:4]}",
        "name": "Artista Teste",
        "password_hash": "senha123",
        "latitude": 0.0,
        "longitude": 0.0,
        "type": "artist",
        "created_at": "2025-01-01"
    }
    base.update(overrides)
    return base



# ---------------------------
#         TESTES
# ---------------------------

def test_get_artists():
    """
    Testa a listagem de todos os artistas.
    """
    response = client.get("/api/artists/")
    assert response.status_code == 200, "A rota GET /artists deve responder 200"

    data = response.json()
    assert isinstance(data, list), "O retorno da listagem deve ser uma lista"


def test_create_artist():
    """
    Testa a criação de um novo artista.
    """
    artist = make_artist()

    response = client.post("/api/artists/", json=artist)
    assert response.status_code == 200, f"Erro ao criar artista: {response.text}"

    data = response.json()
    assert "id" in data, "O retorno deve incluir o ID do artista criado"
    assert data["email"] == artist["email"]
    assert data["username"] == artist["username"]



def test_get_artist_by_id():
    """
    Testa a recuperação de um artista pelo ID.
    """
    artist = make_artist(name="Artista Get ID")

    create = client.post("/api/artists/", json=artist)
    assert create.status_code == 200, f"Erro ao criar artista: {create.text}"
    artist_id = create.json()["id"]

    response = client.get(f"/api/artists/{artist_id}")
    assert response.status_code == 200, f"Erro ao buscar artista ID {artist_id}"

    data = response.json()
    assert data["id"] == artist_id
    assert data["name"] == "Artista Get ID"


def test_update_artist():
    """
    Testa a atualização de dados de um artista.
    """
    artist = make_artist(name="Artista Update")
    create = client.post("/api/artists/", json=artist)
    assert create.status_code == 200
    artist_id = create.json()["id"]

    update_payload = {"name": "Artista Atualizado"}

    response = client.put(f"/api/artists/{artist_id}", json=update_payload)
    assert response.status_code == 200, f"Erro ao atualizar artista ID {artist_id}"

    updated = response.json()
    assert updated["name"] == "Artista Atualizado"



def test_delete_artist():
    """
    Testa a exclusão de um artista.
    """
    artist = make_artist(name="Artista Delete")
    create = client.post("/api/artists/", json=artist)
    assert create.status_code == 200
    artist_id = create.json()["id"]

    delete = client.delete(f"/api/artists/{artist_id}")
    assert delete.status_code == 200, f"Erro ao excluir artista ID {artist_id}"

    data = delete.json()
    assert "message" in data
    assert "excluído" in data["message"].lower()

    # Confirma que foi removido
    verify = client.get(f"/api/artists/{artist_id}")
    assert verify.status_code == 404, "O artista deveria estar excluído"

