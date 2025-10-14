from app.db.supabase_client import get_supabase
from fastapi import APIRouter
router = APIRouter()

@router.post("/musics")
def adicionar_musica_completa():
    supabase = get_supabase()
    
    # INSERT com múltiplos campos
    nova_musica = {
        "title": "Balada do Verão",           # 🎵 Argumento 1: Título
        "artist_id": 2,                       # 🎤 Argumento 2: ID do Artista
        "duration": "3:45",                   # ⏱️ Argumento 3: Duração
        "genre": "Sertanejo",                 # 🎭 Argumento 4: Gênero
        "description": "Música de verão 2024" # 📝 Argumento 5: Descrição
    }
    
    response = supabase.table("musics").insert(nova_musica).execute()
    
    if response.data:
        print(f"✅ Música '{nova_musica['title']}' adicionada para o artista {nova_musica['artist_id']}!")
        return response.data[0]
    return None

def adicionar_usuario_completo():
    supabase = get_supabase()
    
    # INSERT com múltiplos campos
    novo_usuario = {
        "email": "joao.artista@email.com",    # 📧 Argumento 1: Email
        "username": "joao_artista",           # 👤 Argumento 2: Username  
        "name": "João Silva",                 # 🏷️ Argumento 3: Nome
        "type": "artist",                     # 🎯 Argumento 4: Tipo (artist/normal)
        "bio": "Artista de música popular"    # 📖 Argumento 5: Biografia
    }
    
    response = supabase.table("users").insert(novo_usuario).execute()
    
    if response.data:
        print(f"✅ Usuário '{novo_usuario['username']}' ({novo_usuario['email']}) criado!")
        return response.data[0]
    return None