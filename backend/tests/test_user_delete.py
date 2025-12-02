from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_user():
    user = {
        "email": "ana@example.com",
        "username": "ana123",
        "name": "Ana",
        "password_hash": "senha123",
        "type": "normal"
    }
    create_response = client.post("/api/users/", json=user)
    user_id = create_response.json()["id"]

    response = client.delete(f"/api/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "User deleted"

    get_response = client.get(f"/api/users/{user_id}")
    assert get_response.status_code == 404
