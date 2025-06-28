# Importing required packages
import requests
import base64
import re
from PIL import Image
import io
import os
from Markdown_Conversion import markdown_to_html

# Setting the environment to see all the results
import sys
sys.stdout.reconfigure(encoding='utf-8')  # Add this line at the top

# ========== CONFIGURATION ==========
PERPLEXITY_API_KEY = ""
PERPLEXITY_ENDPOINT = "https://api.perplexity.ai/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
    "Content-Type": "application/json"
}
MODEL = "r1-1776"
# ===================================


# Convert PIL image to base64 string
def pil_image_to_base64(image: Image.Image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")


# Send image + user prompt to Perplexity API
def query_perplexity_with_image(base64_image: str):
    user_prompt = """
        Give me the digital form of this attached image in a raw markdown format. Use '#' to denote
        headers, '*' to denote bulleted points and '| |' to denote tables. Retain the output structure same as the image.
        New lines will be separated using \n s. Maintain equal spacing between lines.
"""
    data = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_prompt},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"
                    }}
                ]
            }
        ]
    }

    response = requests.post(PERPLEXITY_ENDPOINT, headers=HEADERS, json=data)
    if response.status_code != 200:
        raise Exception(f"Perplexity API Error: {response.status_code} - {response.text}")
    
    return response.json()["choices"][0]["message"]["content"]

# Extract markdown content inside triple backticks
def extract_markdown(raw_text: str):
    # Remove any content inside <think>...</think> including the tags
    cleaned_text = re.sub(r"<think>.*?</think>", "", raw_text, flags=re.DOTALL | re.IGNORECASE)
    
    # Extract content inside triple backticks (markdown)
    match = re.search(r"```(?:markdown)?\n(.*?)```", cleaned_text, re.DOTALL)
    
    return match.group(1).strip() if match else cleaned_text.strip()

# Main processing pipeline (images only)
def ocr_extract_markdown_from_file(file_path: str):
    if file_path.lower().endswith(".pdf"):
        raise ValueError("This function only supports image files. PDF files are not allowed.")

    print("Loading image")
    image = Image.open(file_path).convert("RGB")

    print(f"Processing image")
    base64_img = pil_image_to_base64(image)
    raw_response = query_perplexity_with_image(base64_img)
    markdown = extract_markdown(raw_response)

    with open("Perplexity_Output.md", 'w', encoding = "utf-8") as f:
        f.write(markdown)

    print("--------The markdown starts from here--------------")
    result = markdown_to_html(markdown)
    return result