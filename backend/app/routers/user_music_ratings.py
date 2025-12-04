from fastapi import APIRouter
from app.models import User_music_ratings
from app.db.supabase_client import get_supabase

@router.get("/selectratings")
def get_ratings():
    supabase = get_supabase()
    response = supabase.table("rating").select("*").execute()
    return response.data  

@router.get("/styles/{user_music_ratings_id}")
def get_rating_by_id(user_music_ratings_id: int):
    supabase = get_supabase()
    response = supabase.table("styles").select("*").eq("id", user_music_ratings_id).execute()
    if response.data:
        return response.data[0]
    return {"error": "rating not found"}

@router.post("/user_music_ratings")
def create_rating(user_music_ratings: User_music_ratings):
    supabase = get_supabase()
    new_rating = {
       "rating": user_music_ratings.rating,
        
    }
    response = supabase.table("user_music_ratings").insert(new_rating).execute()
    if response.data:
        return response.data[0]
    return {"error": "Failed to create rating"} 


