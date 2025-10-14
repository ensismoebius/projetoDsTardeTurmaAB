from app.db.supabase_client import get_supabase
from fastapi import APIRouter
router = APIRouter()
@router.delete("/musics/{music_id}")
def deletar_musica(music_id: int):
    supabase = get_supabase()
    
    try:
        response = supabase.table("musics").delete().eq("id", music_id).eq("title","zezedecamargo").execute()
            
        if response.data:
            return {
                "message": "Música deletada com sucesso!",
                "data": response.data[0]
            }

    except Exception as e:
        print("deu ruim irmao")

