import pytest
import uuid
from app.main import app
from fastapi.testclient import TestClient
from app.db.supabase_client import get_supabase

client = TestClient(app)
supabase = get_supabase()


def generate_unique_artist():
    unique_id = uuid.uuid4().hex[:6]
    return {
        "name": f"Artist {unique_id}",
        "email": f"artist{unique_id}@mail.com",
        "username": f"artist{unique_id}",
        "password_hash": "senha123",
        "type": "artist"  # deve ser minúsculo
    }


@pytest.fixture
def cleanup_artists():
    yield
    artists = supabase.table("users").select("*").like("username", "artist%").execute().data
    for a in artists:
        musics = supabase.table("musics").select("*").eq("artist_id", a["id"]).execute().data
        if not musics:
            supabase.table("users").delete().eq("id", a["id"]).execute()


def test_create_artist(cleanup_artists):
    artist = generate_unique_artist()
    response = client.post("/api/artists/", json=artist)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == artist["email"]
    assert data["username"] == artist["username"]
    assert data["type"] == artist["type"]  # agora bate com o banco


def test_get_artist_by_id(cleanup_artists):
    artist = generate_unique_artist()
    create_resp = client.post("/api/artists/", json=artist)
    artist_id = create_resp.json()["id"]

    get_resp = client.get(f"/api/artists/{artist_id}")
    assert get_resp.status_code == 200
    data = get_resp.json()
    assert data["id"] == artist_id
    assert data["email"] == artist["email"]


def test_update_artist(cleanup_artists):
    artist = generate_unique_artist()
    create_resp = client.post("/api/artists/", json=artist)
    artist_id = create_resp.json()["id"]

    updated_data = {"name": f"{artist['name']} Updated"}
    update_resp = client.put(f"/api/artists/{artist_id}", json=updated_data)
    assert update_resp.status_code == 200

    get_resp = client.get(f"/api/artists/{artist_id}")
    data = get_resp.json()
    assert data["name"] == updated_data["name"]
