# Importing required packages
from pyzerox import zerox
import os
import json
import asyncio
from Markdown_Conversion import markdown_to_html

# Model Set Up for GPT model
kwargs = {}
custom_system_prompt = None

# Setting the OpenAI model
model = "gpt-4o-mini"
os.environ["OPENAI_API_KEY"] = ""

# Define the function to get the result
async def main(file_path):

    # Set the file path
    file_path = file_path

    # Set which page to select (None means all pages)
    select_pages = None

    # Set the output_directory
    output_dir = r"C:\Users\Webbies\Jupyter_Notebooks\Invoice_Reader\OmniAi_Results"

    # Generate the result
    result = await zerox(file_path = file_path, model = model, output_dir = output_dir,
                         custom_system_prompt = custom_system_prompt, select_pages = select_pages, **kwargs)
    

    # Get the contents of the page
    page_contents = [page.content for page in result.pages][0]
    
    # Convert the result into html format
    html_result = markdown_to_html(page_contents)

    # Return the result
    return html_result