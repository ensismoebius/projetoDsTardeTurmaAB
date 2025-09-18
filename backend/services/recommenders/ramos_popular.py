from typing import Dict, Any, List
from peewee import fn, JOIN
from .helper import try_import_models

def recommend_popular(User=None, Music=None, UserMusicRating=None, user_id: int = None, limit: int = 10) -> List[Dict[str, Any]]:
  if not (User and Music and UserMusicRating):
    imported = try_import_models()
    User = User or imported.get("User")
    Music = Music or imported.get("Music")
    UserMusicRating = UserMusicRating or imported.get("UserMusicRating")
    
  if not (User and Music and UserMusicRating):
    raise RuntimeError("Modelos não fornecidos.")

  subq = (
    UserMusicRating
      .select(UserMusicRating.music)
      .where(UserMusicRating.user == user_id)
  )

  q = (
    Music
      .select(Music, fn.COUNT(UserMusicRating.id).alias("likes"))
      .join(UserMusicRating, JOIN.LEFT_OUTER, on=((UserMusicRating.music == Music.id) & (UserMusicRating.rating == 1)))
      .where(Music.id.not_in(subq))
      .group_by(Music.id)
      .order_by(fn.COUNT(UserMusicRating.id).desc(), Music.posted_at.desc())
      .limit(limit)
  )
  
  out = []
  
  for row in q:
    out.append({
      "id": row.id,
      "title": getattr(row, "title", None),
      "artist_id": getattr(row, "artist_id", None),
      "likes": int(getattr(row, "likes", 0) or 0),
      "posted_at": getattr(row, "posted_at", None)
    })

  return out