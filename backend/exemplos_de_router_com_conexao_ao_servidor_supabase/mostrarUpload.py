from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.db.supabase_client import get_supabase
import uuid
router = APIRouter()
@router.post("/upload-file-only")
async def upload_file_only(
    music_file: UploadFile = File(..., description="Arquivo MP3 ou MP4"),
    folder: str = Form("musics", description="Pasta no bucket")
):
    """
    Apenas faz upload do arquivo para o bucket, sem salvar no banco
    """
    try:
        supabase = get_supabase()
        
        # Validar tipo de arquivo
        if not music_file.filename.lower().endswith(('.mp3', '.mp4')):
            raise HTTPException(400, "Apenas arquivos MP3 e MP4 são permitidos")
        
        # Ler arquivo
        file_content = await music_file.read()
        
        # Gerar nome único
        unique_name = f"{uuid.uuid4().hex}_{music_file.filename}"
        
        # Fazer upload
        upload_response = supabase.storage.from_(folder).upload(unique_name, file_content)
        
        if hasattr(upload_response, 'error') and upload_response.error:
            raise HTTPException(500, f"Erro no upload: {upload_response.error}")
        
        # Obter URL pública
        public_url = supabase.storage.from_(folder).get_public_url(unique_name)
        
        return {
            "success": True,
            "message": "Arquivo enviado com sucesso!",
            "file_name": unique_name,
            "public_url": public_url,
            "original_name": music_file.filename
        }
        
    except Exception as e:
        raise HTTPException(500, f"Erro: {str(e)}")