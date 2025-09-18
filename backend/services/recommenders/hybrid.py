from typing import List, Dict, Any
from collections import defaultdict
from utils.ramos_helper import try_import_models
from collab import recommend_collaborative_user_based
from ramos_popular import recommend_popular
from geo import recommend_geo

def _normalize_score_map(m: dict) -> dict:
  if not m:
    return {}

  vals = list(m.values())
  mn = min(vals)
  mx = max(vals)

  if mx == mn:
    return {k: 1.0 for k in m}

  return {k: (v - mn) / (mx - mn) for k, v in m.items()}

def recommend_hybrid(User=None, Music=None, UserMusicRating=None, user_id: int = None, limit: int = 10, w_pop: float = 0.3, w_collab: float = 0.5, w_geo: float = 0.2, collab_similarity: str = "jaccard", geo_method: str = "haversine"):
  if not (User and Music and UserMusicRating):
    imported = try_import_models()
    User = User or imported.get("User")
    Music = Music or imported.get("Music")
    UserMusicRating = UserMusicRating or imported.get("UserMusicRating")
  
  if not (User and Music and UserMusicRating):
    raise RuntimeError("Models not provided.")

  pop = recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit*3)

  try:
    coll = recommend_collaborative_user_based(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit*3, similarity=collab_similarity)
  except Exception:
    coll = []

  geo = recommend_geo(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, radius_km=20.0, limit=limit*3, method=geo_method)

  pop_map = {p["id"]: float(p.get("likes", 0.0)) for p in pop}
  coll_map = {c["id"]: float(c.get("score", 0.0)) for c in coll}
  geo_map = {g["id"]: (1.0/(1.0+g["distance_km"]) if g.get("distance_km") is not None else 0.0) for g in geo}
  pop_norm = _normalize_score_map(pop_map)
  coll_norm = _normalize_score_map(coll_map)
  geo_norm = _normalize_score_map(geo_map)
  total = float(w_pop + w_collab + w_geo) or 1.0
  w_pop, w_collab, w_geo = float(w_pop)/total, float(w_collab)/total, float(w_geo)/total
  combined = defaultdict(float)

  for mid, s in pop_norm.items():
    combined[mid] += w_pop * s
  for mid, s in coll_norm.items():
    combined[mid] += w_collab * s
  for mid, s in geo_norm.items():
    combined[mid] += w_geo * s

  if not combined:
    return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)

  sorted_top = sorted(combined.items(), key=lambda x: x[1], reverse=True)[:limit]
  ids = [i for i, _ in sorted_top]
  musics = []
  musics_q = Music.select().where(Music.id.in_(ids))
  score_lookup = {i: s for i, s in sorted_top}
  
  for m in musics_q:
    musics.append({
      "id": m.id,
      "title": getattr(m, "title", None),
      "artist_id": getattr(m, "artist_id", None),
      "score": float(score_lookup.get(m.id, 0.0))
    })

  musics.sort(key=lambda x: x["score"], reverse=True)
  
  return musics