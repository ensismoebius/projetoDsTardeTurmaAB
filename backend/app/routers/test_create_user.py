from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    user = {
        "email": "maria@gmail.com",
        "username": "mariazinha",
        "name": "Maria Silva",
        "password_hash": "senha123"
    }

    response = client.post("/users/", json=user)
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    data = response.json()

    assert data["name"] == "Maria Silva"
    assert data["email"] == "maria@gmail.com"
    assert data["username"] == "mariazinha"
    assert data["password_hash"] == "senha123"

    assert "id" in data
    assert isinstance(data["id"], int)
