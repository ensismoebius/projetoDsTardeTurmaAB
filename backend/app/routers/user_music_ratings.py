from fastapi import APIRouter
from app.models import User_music_ratings
from app.db.supabase_client import get_supabase

@router.get("/selectratings")
def get_ratings():
    supabase = get_supabase()
    response = supabase.table("rating").select("*").execute()
    return response.data  

@router.get("/styles/{user_music_ratings_id}")
def get_styles_by_id(User_music_ratings_id: int):
    supabase = get_supabase()
    response = supabase.table("styles").select("*").eq("id", User_music_ratings_id).execute()
    if response.data:
        return response.data[0]
    return {"error": "style not found"}