"""
Este módulo fornece funcionalidades para recomendar músicas com base na localização geográfica dos usuários e artistas.
Ele utiliza diferentes métodos de cálculo de distância, como Haversine e earth_distance, para encontrar músicas relevantes.
"""

from typing import List, Dict, Any, Tuple, Optional
from peewee import fn
import logging
from services.popular import recommend_popular
from utils.ramos_helper import try_import_models
import backend.utils.geo

try:
    # prefer public API if available
  from backend.utils.geo import haversine_km
except Exception:
  # fallback to module (may expose private name)
  haversine_km = getattr(backend.utils.geo, "_haversine_km", None)

logger = logging.getLogger(__name__)

def recommend_geo(User=None, Music=None, UserMusicRating=None, user_id: int = None, radius_km: float = 20.0, limit: int = 10, method: str = "haversine") -> List[Dict[str, Any]]:
  """
  Recomenda músicas com base na localização geográfica do usuário.

  Args:
      User: Modelo do usuário (Peewee).
      Music: Modelo da música (Peewee).
      UserMusicRating: Modelo de avaliação de música do usuário (Peewee).
      user_id (int): O ID do usuário para quem as recomendações são geradas.
      radius_km (float): O raio em quilômetros para buscar artistas próximos.
      limit (int): O número máximo de recomendações a serem retornadas.
      method (str): O método de cálculo de distância a ser usado ("haversine" ou "earth_distance").

  Returns:
      List[Dict[str, Any]]: Uma lista de dicionários, onde cada dicionário representa uma música recomendada
                            com informações como ID, título, ID do artista, distância e data de postagem.

  Raises:
      RuntimeError: Se os modelos Peewee não forem fornecidos ou importados corretamente.
  """
  if not (User and Music and UserMusicRating):
    imported = try_import_models()
    User = User or imported.get("User")
    Music = Music or imported.get("Music")
    UserMusicRating = UserMusicRating or imported.get("UserMusicRating")

  if not (User and Music and UserMusicRating):
    raise RuntimeError("Models not provided.")

  user = User.get_or_none(User.id == user_id)

  if not user or getattr(user, "latitude", None) is None or getattr(user, "longitude", None) is None:
    return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)

  if user_id is None:
    logger.debug("No user_id provided — returning popular recommendations.")
    return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=None, limit=limit)

  user = User.get_or_none(User.id == user_id)
  if not user or getattr(user, "latitude", None) is None or getattr(user, "longitude", None) is None:
    logger.debug("User missing or without coordinates — falling back to popular.")
    return recommend_popular(User=User, Music=Music, UserMusicRating=UserMusicRating, user_id=user_id, limit=limit)

  q_limit = 1000
  # normalize inputs
  method = (method or "haversine").lower()
  limit = max(1, int(limit or 10))
  if limit > 100:
    limit = 100
  if radius_km is None:
    radius_km = 20.0
  radius_km = float(radius_km)
  sample_limit = 1000

  rated_subq = (
    UserMusicRating
      .select(UserMusicRating.music)
      .where(UserMusicRating.user == user_id)
  )

  out = []

  if method == "haversine":
    # Directly execute haversine logic if method is explicitly set to haversine
    pass # The haversine logic is below this block
  elif method == "earth_distance":
    try:
      meter_limit = int(radius_km * 1000.0)
      earth_expr = fn.earth_distance(
        fn.ll_to_earth(User.latitude, User.longitude),
        fn.ll_to_earth(user.latitude, user.longitude)
      )
      q = (
        Music
          .select(Music, earth_expr.alias("dist_m"))
          .join(User, on=(Music.artist == User.id))
          .where((earth_expr < meter_limit) & (Music.id.not_in(rated_subq)))
          .order_by(earth_expr, Music.posted_at.desc())
          .limit(limit)
      )
      
      for row in q:
        dist_m = getattr(row, "dist_m", None)
        out.append({
          "id": row.id,
          "title": getattr(row, "title", None),
          "artist_id": getattr(row, "artist_id", None),
          "distance_km": (float(dist_m) / 1000.0) if dist_m is not None else None,
          "posted_at": getattr(row, "posted_at", None)
        })

    except Exception as exc:
      logger.exception("earth_distance approach failed — falling back to haversine.")
      method = "haversine"
  
  if method == "haversine" and not out: # Only run haversine if earth_distance didn't already provide results or failed
    sample_q = (
      Music
        .select(Music, User.latitude, User.longitude)
        .join(User, on=(Music.artist == User.id))
        .where((User.latitude.is_null(False)) & (User.longitude.is_null(False)) & (Music.id.not_in(rated_subq)))
        .order_by(Music.posted_at.desc())
        .limit(q_limit)
    )

    candidates: List[Tuple[float, Any]] = []
    seen = set()
    
    for row in sample_q:
      if row.id in seen:
        continue
      
      try:
        if haversine_km:
          dist_km = float(haversine_km(float(user.latitude), float(user.longitude), float(row.latitude), float(row.longitude)))
        else:
          # last resort: call module private function
          dist_km = float(backend.utils.geo._haversine_km(float(user.latitude), float(user.longitude), float(row.latitude), float(row.longitude)))
      except Exception:
        logger.debug("Skipping candidate %s due to haversine conversion error.", getattr(row, "id", None))
        continue
      
      if dist_km <= float(radius_km):
        candidates.append((dist_km, row))
        seen.add(row.id)

    candidates.sort(key=lambda x: (x[0],))
    
    for dist_km, row in candidates[:limit]:
      out.append({
        "id": row.id,
        "title": getattr(row, "title", None),
        "artist_id": getattr(row, "artist_id", None),
        "distance_km": float(dist_km),
        "posted_at": getattr(row, "posted_at", None)
      })

  if len(out) < limit:
    more = recommend_popular(user_id=user_id, limit=limit - len(out))
    existing = {x["id"] for x in out}
    
    for m in more:
      if m["id"] not in existing:
        out.append(m)

  return out