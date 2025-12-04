from fastapi import APIRouter
from app.models import User_music_ratings
from app.db.supabase_client import get_supabase

@router.get("/selectratings")
def get_ratings():
    supabase = get_supabase()
    response = supabase.table("ratings").select("*").execute()
    return response.data  
