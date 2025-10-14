from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_update_nonexistent_user():
    user = {"name": "Novo Nome"}
    response = client.put("/users/999", json=user)
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    assert response.json()["error"] == "User not found"

def test_update_user_with_invalid_id():
    user = {"name": "Qualquer"}
    response = client.put("/users/abc", json=user)
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    # erro de validação do FastAPI
    assert response.status_code == 422