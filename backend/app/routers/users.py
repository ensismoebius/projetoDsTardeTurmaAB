"""
Este módulo define as rotas da API para operações relacionadas a usuários.
Ele permite buscar, criar, atualizar e deletar perfis de usuários.
"""
from fastapi import APIRouter, HTTPException
from app.db.supabase_client import get_supabase

router = APIRouter()
supabase = get_supabase()

@router.get("/")
def get_users():
    """
    Retorna uma lista de todos os usuários.
    """
    try:
        response = supabase.table("users").select("*").execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao buscar usuários no banco de dados."
            )

        return response.data or []

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao tentar recuperar usuários."
        )
    
@router.get("/{user_id}")
def get_user_by_id(user_id: int):
    """
    Retorna um usuário específico pelo seu ID.
    """
    try:
        response = supabase.table("users").select("*").eq("id", user_id).execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao consultar o banco de dados."
            )

        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao tentar buscar o usuário."
        )

@router.post("/")
def create_user(data: dict):
    """
    Cria um novo usuário.
    """
    try:
        # Verifica duplicação de e-mail
        existing = supabase.table("users").select("*").eq("email", data.get("email")).execute()

        if hasattr(existing, "error") and existing.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao verificar e-mail no banco de dados."
            )

        if existing.data:
            raise HTTPException(status_code=400, detail="Email already registered")

        response = supabase.table("users").insert(data).execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao criar usuário no banco de dados."
            )

        if not response.data:
            raise HTTPException(status_code=400, detail="User not created")

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao criar usuário."
        )


@router.put("/{user_id}")
def update_user(user_id: int, data: dict):
    """
    Atualiza um usuário existente.
    """
    try:
        response = supabase.table("users").update(data).eq("id", user_id).execute()

        if hasattr(response, "error") and response.error:
            raise HTTPException(
                status_code=500,
                detail="Erro ao atualizar usuário no banco de dados."
            )

        if not response.data:
            raise HTTPException(status_code=404, detail="User not found")

        return response.data[0]

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erro interno ao atualizar o usuário."
        )



@router.delete("/{user_id}")
def delete_user(user_id: int):
    response = supabase.table("users").delete().eq("id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully", "id": user_id}
