# Importing required packages
import openai
from pdf2image import convert_from_path
from PIL import Image
import base64
import io
import os
import sys
from typing import List

# Set your API key
openai.api_key = ""

# Function to convert PDF to PIL Images 
def pdf_to_images(pdf_path: str):
    return convert_from_path(pdf_path)

# Function to encode PIL Image to base64 string 
def pil_image_to_base64(image: Image.Image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_bytes = buffered.getvalue()
    return base64.b64encode(img_bytes).decode("utf-8")

# Function to send image + prompt to GPT-4o-mini 
import re
def process_image_with_prompt(base64_image: str, user_prompt: str):
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": user_prompt},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"
                    }},
                ],
            }
        ],
        max_tokens=2048,
    )
    full_content = response.choices[0].message.content

    # Extract content between triple backticks using regex
    match = re.search(r"```(?:markdown)?\n(.*?)```", full_content, re.DOTALL)
    if match:
        return match.group(1).strip()
    else:
        return full_content.strip()


def ocr_pdf_with_gpt_markdown(pdf_path: str, prompt: str, output_md: str = "output.md"):
    print("Converting PDF to images...")
    images = pdf_to_images(pdf_path)

    all_md_parts = []

    for idx, image in enumerate(images):
        print(f"Processing page {idx + 1}...")
        b64_img = pil_image_to_base64(image)
        extracted_md = process_image_with_prompt(b64_img, prompt)
        all_md_parts.append(f"## Page {idx + 1}\n\n{extracted_md}")

    final_markdown = "\n\n---\n\n".join(all_md_parts)

    with open(output_md, "w", encoding="utf-8") as f:
        f.write(final_markdown)

    print(f"\nExtracted Markdown saved to: {output_md}")
    print("\n--- Markdown Output ---\n")
    print(final_markdown)


# Example Usage
if __name__ == "__main__":
    pdf_file_path = r"C:\Users\Webbies\Jupyter_Notebooks\Invoice_Reader\Test_Invoice_Reader\Test_Image_Invoice_1.pdf"  
    user_prompt = "Read this image and apply OCR. Extract all the text and tables from this image and " \
    "convert it into a raw markdown text retaining all text and table contents and structure as it is. " \
    "To denote new lines use two \n s"
    ocr_pdf_with_gpt_markdown(pdf_file_path, user_prompt)

# Perform OCR on the document and extract all text, tables in their raw html format retaining the table structure