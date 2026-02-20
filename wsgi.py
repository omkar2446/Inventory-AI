"""
Root-level WSGI entry point for Gunicorn.
This file allows 'gunicorn wsgi:app' to work when running from the project root.
"""
import sys
import os

# Add backend directory to Python path
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Import and create the app
from app import create_app

app = create_app()
