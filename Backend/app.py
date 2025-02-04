from flask_cors import CORS
from flask import Flask, request, jsonify
import chromadb
from chromadb.utils import embedding_functions
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


app = Flask(__name__)
CORS(app)

# Model and database setup
modelPath = "models"
chroma_client = chromadb.PersistentClient(path="imdbmoviedb")

sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name=modelPath)

collection = chroma_client.get_or_create_collection(
    name="movies_collection", embedding_function=sentence_transformer_ef)


def get_poster(movie_title):
    api_key = os.getenv("API_KEY")

    if not movie_title:
        return "N/A"

    url = f"http://www.omdbapi.com/?t={movie_title}&apikey={api_key}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data.get("Poster", "N/A")
        else:
            return "N/A"
    except requests.RequestException:
        return "N/A"


@app.route("/")
def home():
    return "Welcome to the Movie Search API!"


@app.route("/search", methods=["POST"])
def search_movie():
    data = request.json
    input_keywords = data.get("keywords")
    year_from = data.get("year_from")
    year_to = data.get("year_to")
    IMDB_Rating = data.get("IMDB_Rating")
    director = data.get("director")

    if not input_keywords:
        return jsonify({"error": "Keywords are required"}), 400

    where_filter = []
    if year_from is not None:
        where_filter.append({"Released_Year": {"$gte": year_from}})
    if year_to is not None:
        where_filter.append({"Released_Year": {"$lte": year_to}})
    if IMDB_Rating is not None:
        where_filter.append({"IMDB_Rating": {"$gte": IMDB_Rating}})
    if director:
        where_filter.append({"Director": {"$eq": director}})

    if len(where_filter) > 1:
        where_filter = {"$and": where_filter}
    elif len(where_filter) == 1:
        where_filter = where_filter[0]
    elif not where_filter:
        where_filter = None
                                                  
    results = collection.query(
        query_texts=[input_keywords],
        n_results=5,
        where=where_filter,
    )

    # Add poster URLs to each movie result
    for i, movie_data in enumerate(results.get("metadatas", [[]])[0]):
        movie_title = movie_data.get("Series_Title", "")
        results["metadatas"][0][i]["Poster_URL"] = get_poster(movie_title)

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
