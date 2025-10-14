from app.db.supabase_client import get_supabase
from fastapi import APIRouter
router = APIRouter()
@router.get("/musics")
def buscar_musicas_filtradas():
    supabase = get_supabase()
    
    # SELECT com múltiplos WHERE
    response = supabase.table("musics").select("*").eq("artist_id", 1).eq("genre", "Sertanejo").execute()
    
    print(f"🎵 {len(response.data)} músicas do artista 1 no gênero Sertanejo")
    return response.data

def buscar_usuarios_filtrados():
    supabase = get_supabase()
    
    # SELECT com múltiplos filtros
    response = supabase.table("users").select("*").eq("type", "artist").neq("bio", None).execute()
    
    print(f"👤 {len(response.data)} artistas com biografia")
    return response.data