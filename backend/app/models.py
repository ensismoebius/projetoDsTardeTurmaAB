from pydantic import BaseModel

class User(BaseModel):
    name: str

class Music(BaseModel):
    title: str
