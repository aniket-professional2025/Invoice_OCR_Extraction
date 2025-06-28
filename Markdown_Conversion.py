# Import required packages
import markdown2

# Define a function to convert a markdown text into html format for rendering
def markdown_to_html(markdown_text):
    html = markdown2.markdown(markdown_text)
    return html
