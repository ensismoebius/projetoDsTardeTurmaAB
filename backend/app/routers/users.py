"""

Este módulo define rotas para operações CRUD de usuários usando FastAPI.

Variáveis:
- fake_db: Lista simulando um banco de dados de usuários, cada usuário é um dicionário com 'id' e 'name'.

Nota: Este código utiliza um banco de dados em memória apenas para fins de demonstração.

"""

from fastapi import APIRouter
from app.models import User
from app.db.fake_db import fake_db

router = APIRouter()

@router.get("/")
def get_users():
    return fake_db.users

@router.get("/{user_id}")
def get_user(user_id: int):
    user = next((user for user in fake_db if user["id"] == user_id), None)
    if user:
        return user

@router.post("/")
def create_user(user: User):
    new_user = {"id": len(fake_db) + 1, "name": user.name}
    fake_db.users.append(new_user)
    return new_user

@router.put("/{user_id}")
def update_user(user_id: int, user: User):
    if user_id > len(fake_db):
        return {"error": "User not found"}
    fake_db.users[user_id - 1] = {"id": user_id, "name": user.name}
    return {"message": "User updated"}

@router.delete("/{user_id}")
def delete_user(user_id: int):
    if user_id > len(fake_db):
        return {"error": "User not found"}
    del fake_db.users[user_id - 1]
    return {"message": "User deleted"}