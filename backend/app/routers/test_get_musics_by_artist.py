from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_musics_by_artist():
    artist_id = 1
    response = client.get(f"/api/artists/{artist_id}/musics")
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    musics = response.json()
    assert isinstance(musics, list)
    for music in musics:
        assert music["artist_id"] == artist_id
