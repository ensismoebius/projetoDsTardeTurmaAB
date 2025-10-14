from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_nonexistent_user():
    response = client.delete("/users/999")
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    assert response.json()["error"] == "User not found"
    list_response = client.get("/users/")
    assert isinstance(list_response.json(), list)