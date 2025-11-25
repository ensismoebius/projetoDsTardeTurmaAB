"""
Este módulo define as rotas da API para operações relacionadas a artistas.
Ele permite buscar, criar, atualizar e deletar perfis de artistas.
"""
from fastapi import APIRouter, HTTPException
from app.db.supabase_client import get_supabase

router = APIRouter()
supabase = get_supabase()


@router.get("/")
def get_artists():
    """
    Retorna uma lista de todos os artistas.
    """
    try:
        response = supabase.table("users").select("*").eq("type", "artist").execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao buscar artistas no banco de dados."
            )

        return response.data or []

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao tentar recuperar artistas."
        )



@router.get("/{artist_id}")
def get_artist_by_id(artist_id: int):
    """
    Retorna um artista específico pelo seu ID.
    """
    try:
        response = (
            supabase.table("users")
            .select("*")
            .eq("id", artist_id)
            .eq("type", "artist")
            .execute()
        )

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao consultar o banco de dados."
            )

        if not response.data:
            raise HTTPException(status_code=404, detail="Artist not found")

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao tentar buscar o artista."
        )
@router.post("/")
def create_artist(artist: dict):
    """
    Cria um novo artista.
    """
    try:
        artist["type"] = "artist"

        response = supabase.table("users").insert(artist).execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao inserir artista no banco de dados."
            )

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao criar artista."
        )


@router.put("/{artist_id}")
def update_artist(artist_id: int, artist: dict):
    """
    Atualiza um artista existente.
    """
    try:
        response = (
            supabase.table("users")
            .update(artist)
            .eq("id", artist_id)
            .eq("type", "artist")
            .execute()
        )

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao atualizar artista no banco de dados."
            )

        if not response.data:
            raise HTTPException(status_code=404, detail="Artist not found")

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao atualizar o artista."
        )



@router.delete("/{artist_id}")
def delete_artist(artist_id: int):
    """
    Deleta um artista existente pelo seu ID.

    Args:
        artist_id (int): O ID do artista a ser deletado.

    Returns:
        dict: Uma mensagem de sucesso.

    Raises:
        HTTPException: Se o artista não for encontrado.
    """
    response = (
        supabase.table("users")
        .delete()
        .eq("id", artist_id)
        .eq("type", "artist")
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Artist not found")
    return {"message": "Artist deleted successfully"}
