import math

def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
  if lat1 is None or lon1 is None or lat2 is None or lon2 is None:
    raise ValueError("Coordenadas inválidas para haversine")
  
  try:
    phi1 = math.radians(float(lat1))
    phi2 = math.radians(float(lat2))
    dphi = math.radians(float(lat2) - float(lat1))
    dlambda = math.radians(float(lon2) - float(lon1))
  except (TypeError, ValueError):
    raise ValueError("Coordenadas não numéricas para haversine")
  
  r = 6371.0
  a = math.sin(dphi/2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda/2)**2
  c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
  
  return r * c