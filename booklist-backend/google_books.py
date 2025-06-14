import os
import requests
from dotenv import load_dotenv

load_dotenv()

GOOGLE_BOOKS_API_KEY = os.getenv('GOOGLE_BOOKS_API_KEY', 'AIzaSyB5r9k4M7gx6DUTDu9NAccGMhTrqjZmwkg')
BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

def get_daily_discoveries():
    # Get random books from different categories
    categories = ['fiction', 'science', 'history', 'biography', 'technology']
    discovered_books = []
    
    for category in categories:
        try:
            response = requests.get(
                BASE_URL,
                params={
                    'q': f'subject:{category}',
                    'maxResults': 1,
                    'key': GOOGLE_BOOKS_API_KEY,
                    'orderBy': 'newest'
                }
            )
            response.raise_for_status()
            data = response.json()
            
            if 'items' in data and len(data['items']) > 0:
                book = data['items'][0]['volumeInfo']
                discovered_books.append({
                    'title': book.get('title', 'Unknown Title'),
                    'author': ', '.join(book.get('authors', ['Unknown Author'])),
                    'description': book.get('description', 'No description available'),
                    'image_url': book.get('imageLinks', {}).get('thumbnail', ''),
                    'category': category.capitalize()
                })
        except Exception as e:
            print(f"Error fetching books for category {category}: {str(e)}")
            continue
    
    return discovered_books 