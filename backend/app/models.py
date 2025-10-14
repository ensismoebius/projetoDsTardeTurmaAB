from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    bio: str
    styles: list[int]

class Artist(BaseModel):
    id: int
    name: str
    email: str
    password: str
    bio: str
    musics: list[int]

class Music(BaseModel):
    id: int
    title: str
    description: str
    duration: str
    link: str
    lyric: str
    posted: date
    credits: list[int]

class Styles(BaseModel):
    id: int
    name: str

class User_music_ratings(BaseModel):
    id: int
    user_id: int
    music_id: int
    rating: int
    created_at: date
    genre: str
