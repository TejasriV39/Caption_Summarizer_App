# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from models.text_summarizer import summarize_text
from models.image_captioner import generate_caption
import os


app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    summary = summarize_text(text)
    return jsonify({"summary": summary})

@app.route('/caption', methods=['POST'])
def caption():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    image = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)
    caption = generate_caption(image_path)
    return jsonify({"caption": caption})

if __name__ == "__main__":
    app.run(debug=True)
