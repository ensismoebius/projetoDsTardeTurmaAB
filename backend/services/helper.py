from typing import Dict, Any, List
# --------------------------
# Helper de importação de models
# --------------------------

def try_import_models() -> Dict[str, Any]:
  candidates = [
      "backend.models",
      "backend.models.models",
      "models",
      "app.models",
  ]

  for base in candidates:
      try:
          mod = __import__(base, fromlist=["Users", "Musics", "user_music_ratings"])
          Users = getattr(mod, "Users", None)
          Musics = getattr(mod, "Musics", None)
          UserMusicRating = getattr(mod, "user_music_ratings", None)
          if Users and Musics and UserMusicRating:
              return {
                  "Users": Users,
                  "Musics": Musics,
                  "UserMusicRating": UserMusicRating,
              }
      except Exception:
          continue

  return {}