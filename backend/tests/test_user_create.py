import pytest
from uuid import uuid4
from datetime import datetime, timezone
from fastapi.testclient import TestClient
from app.main import app  

client = TestClient(app)

@pytest.fixture
def cleanup_users():
    """Lista de usuários criados durante o teste para eventual limpeza futura."""
    created_users = []
    yield created_users
    for user_id in created_users:
        pass  


def test_create_user(cleanup_users):
    """Testa criação de usuário via endpoint /api/users/"""

    # Gera sufixo único para email/username
    unique_suffix = uuid4().hex[:8]

    # Payload do usuário
    new_user = {
        "name": f"Usuário Teste {unique_suffix}",
        "email": f"user_{unique_suffix}@mail.com",
        "username": f"user_{unique_suffix}",
        "password_hash": "123456",
        "type": "normal",  
        "created_at": datetime.now(timezone.utc).isoformat()  
    }

    print("Payload enviado:", new_user)

    response = client.post("/api/users/", json=new_user)
    assert response.status_code == 200, f"Erro: {response.json()}"

    
    created_user = response.json()
    cleanup_users.append(created_user.get("id"))

    
    assert created_user["email"] == new_user["email"]
    assert created_user["username"] == new_user["username"]
    assert created_user["type"] == new_user["type"]
