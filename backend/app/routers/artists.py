"""

Este módulo define rotas para operações CRUD de artistas usando FastAPI.

Variáveis:
- fake_db: Lista simulando um banco de dados de usuários, cada artista é um dicionário com 'id' e 'name'.

Nota: Este código utiliza um banco de dados em memória apenas para fins de demonstração.

"""

from fastapi import APIRouter
from app.models import Artist
from app.db.fake_db import fake_db

router = APIRouter()

@router.get("/")
def get_users():
    return fake_db.artist

@router.get("/{artist_id}")
def get_artist(artist_id: int):
    artist = next((artist for artist in fake_db if artist["id"] == artist_id), None)
    if artist:
        return artist

@router.post("/")
def create_artist(artist: Artist):
    new_artist = {"id": len(fake_db) + 1, "name": artist.name}
    fake_db.artists.append(new_artist)
    return new_artist

@router.put("/{artist_id}")
def update_artist(artist_id: int, artist: Artist):
    if artist_id > len(fake_db):
        return {"error": "Artist not found"}
    fake_db.artists[artist_id - 1] = {"id": artist_id, "name": artist.name}
    return {"message": "Artist updated"}

@router.delete("/{artist_id}")
def delete_artist(artist_id: int):
    if artist_id > len(fake_db):
        return {"error": "Artist not found"}
    del fake_db.artists[artist_id - 1]
    return {"message": "Artist deleted"}