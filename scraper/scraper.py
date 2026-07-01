import os
import requests
from dotenv import load_dotenv
from supabase import create_client

# -------------------------
# Load Environment Variables
# -------------------------

load_dotenv()

CINEPLEX_TOKEN = os.getenv("CINEPLEX_TOKEN")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL not found in .env")

if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY not found in .env")

if not CINEPLEX_TOKEN:
    raise ValueError("CINEPLEX_TOKEN not found in .env")

# -------------------------
# Supabase Client
# -------------------------

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# -------------------------
# API Headers
# -------------------------

HEADERS = {
    "Authorization": f"Bearer {CINEPLEX_TOKEN}",
    "Content-Type": "application/json",
    "Origin": "https://www.cineplexbd.com",
    "Referer": "https://www.cineplexbd.com/",
    "User-Agent": "Mozilla/5.0",
}

# -------------------------
# Fetch Movies
# -------------------------

def fetch_movies():
    response = requests.post(
        "https://cineplex-web-api.cineplexbd.com/api/v1/movie-list",
        json={
            "location": 1,
            "path": "home",
        },
        headers=HEADERS,
        timeout=20,
    )

    response.raise_for_status()

    data = response.json()["data"]

    movies = []

    for movie in data["running"]:
        movie["status"] = "now_showing"
        movies.append(movie)

    for movie in data["upcoming"]:
        movie["status"] = "coming_soon"
        movies.append(movie)

    return movies


# -------------------------
# Save To Supabase
# -------------------------

def save_to_supabase(movies):

    payload = []

    for movie in movies:

        payload.append({

            # slug will be UNIQUE
            "slug": movie.get("slug"),

            "title": movie.get("title"),

            "poster_url": movie.get("img"),

            "category": movie.get("category"),

            "genre": movie.get("genre"),

            "release_date": movie.get("release"),

            "language": movie.get("language"),

            "status": movie.get("status"),

        })

    (
        supabase
        .table("movies")
        .upsert(
            payload,
            on_conflict="slug"
        )
        .execute()
    )

    print(f"✅ Successfully synced {len(payload)} movies.")


# -------------------------
# Main
# -------------------------

if __name__ == "__main__":

    print("Fetching movies...")

    movies = fetch_movies()

    print(f"Found {len(movies)} movies")

    save_to_supabase(movies)

    print("Done ✅")