import pytest
from datetime import datetime, timezone
from uuid import uuid4
from fastapi.testclient import TestClient
from app.main import app  # ou de onde você importa sua FastAPI

client = TestClient(app)


def test_update_user():
    """Testa criação e atualização de um usuário"""

    # Criação do usuário
    unique_suffix = uuid4().hex[:6]
    new_user = {
        "name": f"Usuário Teste {unique_suffix}",
        "email": f"user_{unique_suffix}@mail.com",
        "username": f"user_{unique_suffix}",
        "password_hash": "123456",
        "type": "normal",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    create_resp = client.post("/api/users/", json=new_user)
    assert create_resp.status_code == 200  # ou 201
    user_id = create_resp.json()["id"]

    # Atualização do usuário
    updated_data = {"name": f"Usuário Atualizado {unique_suffix}", "type": "normal"}
    update_resp = client.put(f"/api/users/{user_id}", json=updated_data)
    assert update_resp.status_code == 200

    # GET para confirmar alteração
    get_resp = client.get(f"/api/users/{user_id}")
    assert get_resp.status_code == 200
    user_after_update = get_resp.json()
    assert user_after_update["name"] == updated_data["name"]
    assert user_after_update["type"] == updated_data["type"]
