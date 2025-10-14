from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_user():
    user = {"name": "Jo�o"}
    create_response = client.post("/users/", json=user)
    if create_response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", create_response.json())
        return
    created_user = create_response.json()

    user_id = created_user["id"]
    response = client.get(f"/users/{user_id}")
    if response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", response.json())
        return
    assert response.status_code == 200
    assert response.json()["id"] == user_id
    assert response.json()["name"] == "Jo�o"

    data = response.json()
    assert isinstance(data, dict)
    assert set(data.keys()) >= {"id", "name"}
