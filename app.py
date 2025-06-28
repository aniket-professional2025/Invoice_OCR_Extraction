# Importing required packages
from flask import Flask, render_template, request, jsonify
import os
from Perplexity import ocr_extract_markdown_from_file

# Create the application
app = Flask(__name__)

# Set the upload folder and create it
UPLOAD_FOLDER  = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok = True)

# Connecting the index.html file with flask server
@app.route('/')
def index():
    return render_template('index.html')

# Define a function to process images
@app.route('/process_image', methods = ['POST'])
def process_img():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided in the request'}), 400
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No image file selected'}), 400
    
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    try:
        image.save(image_path)

        processed_text = ocr_extract_markdown_from_file(image_path)
        if "Error" in processed_text:
            return jsonify({'error': 'Error in processing Images'}), 500
        
        return jsonify({
            'Extracted_text_table': processed_text
        })
    
    except Exception as e:
        print(f"An unexpected error occured: {e}")
        return jsonify({'error': f"An internal server error occured: {str(e)}"}), 500
    
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)


if __name__ == '__main__':
    app.run(debug = True)