from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    subtitle = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack = db.Column(db.String(300), nullable=False) # e.g. "Python, NLP, Flask"
    category = db.Column(db.String(50), nullable=False) # e.g. "AI & Data Science", "Web Development"
    github_url = db.Column(db.String(250), nullable=True)
    demo_type = db.Column(db.String(50), nullable=True) # "chatbot", "food_waste"
    icon_name = db.Column(db.String(50), nullable=False) # icon identifier

class Certification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    issuer = db.Column(db.String(100), nullable=False) # Pearson, IBM, etc.
    badge_color = db.Column(db.String(50), default="blue")
    verify_url = db.Column(db.String(250), nullable=True)

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(50), nullable=False) # "languages", "web", "tools", "soft"
    proficiency = db.Column(db.Integer, nullable=False) # 1-100
    icon = db.Column(db.String(50), nullable=True)
