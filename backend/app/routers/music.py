from fastapi import APIRouter, HTTPException
from app.db.supabase_client import get_supabase

router = APIRouter(prefix="/api/musics", tags=["musics"])
supabase = get_supabase()

@router.get("/")
def get_all_musics():
    response = supabase.table("musics").select("*").execute()
    return response.data

@router.get("/{music_id}")
def get_music_by_id(music_id: int):
    response = supabase.table("musics").select("*").eq("id", music_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Music not found")
    return response.data[0]

@router.post("/")
def create_music(music: dict):
    music_data = {
        "title": music.get("title"),
        "artist_id": music.get("artist_id"),
        "duration": music.get("duration"),
        "description": music.get("description"),
        "audio_url": music.get("audio_url"),
        "posted_at": music.get("posted_at"),
        "lyric": music.get("lyric"),
        "genre": music.get("genre"),
        "file_name": music.get("file_name"),
    }
    response = supabase.table("musics").insert(music_data).execute()
    return response.data[0]

@router.put("/{music_id}")
def update_music(music_id: int, music: dict):
    response = supabase.table("musics").update(music).eq("id", music_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Music not found")
    return {"message": "Music updated"}

@router.delete("/{music_id}")
def delete_music(music_id: int):
    response = supabase.table("musics").delete().eq("id", music_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Music not found")
    return {"message": "Music deleted"}
