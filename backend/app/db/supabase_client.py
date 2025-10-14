
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = "https://mflpegvqdnqdfvbvfdos.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbHBlZ3ZxZG5xZGZ2YnZmZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDQ3ODEsImV4cCI6MjA3NTYyMDc4MX0.DLcfAc8u1dA91oISnOEMTIq1GxQZ7AAUXWiWmlf0Uo4"

def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)