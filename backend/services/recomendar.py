from typing import Dict, Any

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
          mod = __import__(base, fromlist=["User", "Music", "UserMusicRating"])
          User = getattr(mod, "User", None)
          Music = getattr(mod, "Music", None)
          UserMusicRating = getattr(mod, "UserMusicRating", None)
          if User and Music and UserMusicRating:
              return {
                  "User": User,
                  "Music": Music,
                  "UserMusicRating": UserMusicRating,
              }
      except Exception:
          continue

  return {}