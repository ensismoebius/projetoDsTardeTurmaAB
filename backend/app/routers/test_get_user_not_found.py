from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_nonexistent_user():
    response = client.get("/users/999")
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    assert response.text.strip() == "null"
    assert response.json() is None