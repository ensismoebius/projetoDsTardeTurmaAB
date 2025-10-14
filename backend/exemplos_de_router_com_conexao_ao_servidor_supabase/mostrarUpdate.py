from app.db.supabase_client import get_supabase
from fastapi import APIRouter
router = APIRouter()
@router.put("/musics/{music_id}")
def atualizar_musica_multiplos_campos(music_id: int):
    supabase = get_supabase()
    
    # UPDATE múltiplos campos
    dados_atualizacao = {
        "title": "Novo Título Atualizado",    # 🎵 Campo 1: Novo título
        "duration": "4:20",                   # ⏱️ Campo 2: Nova duração
        "genre": "MPB",                       # 🎭 Campo 3: Novo gênero
        "description": "Descrição atualizada" # 📝 Campo 4: Nova descrição
    }
    
    response = supabase.table("musics").update(dados_atualizacao).eq("id", music_id).execute()
    
    if response.data:
        print(f"✅ Música {music_id} atualizada: {dados_atualizacao}")
        return response.data[0]
    return None
