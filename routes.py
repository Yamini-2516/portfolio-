from flask import Blueprint, render_template, request, jsonify, make_response
from models import db, ContactMessage, Project, Certification, Skill
import re

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    projects = Project.query.all()
    certifications = Certification.query.all()
    skills = Skill.query.all()
    
    # Categorize skills
    skills_by_cat = {
        'languages': [s for s in skills if s.category == 'languages'],
        'web': [s for s in skills if s.category == 'web'],
        'tools': [s for s in skills if s.category == 'tools'],
        'soft': [s for s in skills if s.category == 'soft']
    }
    
    return render_template('index.html', 
                           projects=projects, 
                           certifications=certifications, 
                           skills_by_cat=skills_by_cat)

@bp.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json() or request.form
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Please fill in all required fields.'}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'status': 'error', 'message': 'Please provide a valid email address.'}), 400

    msg = ContactMessage(name=name, email=email, subject=subject or 'Portfolio Contact', message=message)
    db.session.add(msg)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': f'Thank you {name}! Your message has been sent successfully. I will get back to you soon!'
    })

# Interactive AI Chatbot Endpoint (Simulator)
@bp.route('/api/chatbot', methods=['POST'])
def chatbot_api():
    data = request.get_json() or {}
    user_msg = data.get('message', '').strip().lower()
    
    if not user_msg:
        return jsonify({'response': 'Hello! I am Parul University AI Assistant created by Yamini. How can I help you today?'})

    if any(w in user_msg for w in ['hi', 'hello', 'hey', 'greetings']):
        reply = "Hello! Welcome to Parul University AI Assistant. You can ask me about Admission Process, IT Department Courses, Library Timings, Exam Schedule, or Campus Location!"
    elif any(w in user_msg for w in ['admission', 'apply', 'enroll', 'cut off', 'eligibility']):
        reply = "Admissions for B.Tech Information Technology at Parul University require 10+2 with Physics, Chemistry, and Mathematics (PCM). You can apply online via the official university portal."
    elif any(w in user_msg for w in ['course', 'syllabus', 'it', 'subject', 'b.tech', 'btech']):
        reply = "The B.Tech IT program covers core areas including Python Programming, Data Structures & Algorithms, Web Technologies (HTML/CSS/JS), Database Systems, and NLP/AI Applications."
    elif any(w in user_msg for w in ['fee', 'fees', 'tuition', 'cost']):
        reply = "Tuition fees for B.Tech IT at Parul University are approximately ₹80,000 to ₹1,20,000 per year. Merit-based scholarships are available for high achievers."
    elif any(w in user_msg for w in ['exam', 'schedule', 'timetable', 'midterm', 'final']):
        reply = "Mid-term examinations take place in October/March, while End-Semester University examinations commence in December/May. Timetables are published on the Student Portal."
    elif any(w in user_msg for w in ['library', 'books', 'timing', 'hours']):
        reply = "The Parul University Central Library is open Monday to Saturday from 8:00 AM to 10:00 PM. Digital resources and IEEE journals are accessible 24/7."
    elif any(w in user_msg for w in ['yamini', 'creator', 'developer', 'who made']):
        reply = "This AI Chatbot was designed and developed by Yamini Parmar, a 3rd year B.Tech IT student at Parul University specializing in Python & NLP!"
    else:
        reply = f"Thank you for your query about '{user_msg}'. For detailed assistance, please reach out to Parul University Student Helpdesk or contact Yamini Parmar directly at yaminiparmar2516@gmail.com!"

    return jsonify({'response': reply})

# Food Waste Management System Simulator Endpoints
# Simulated state in-memory for live demo session
FOOD_ITEMS_STORE = [
    {"id": 1, "donor": "Parul Campus Canteen", "item": "Fresh Rice & Curry", "qty": "15 kg", "servings": "30 Meals", "status": "Available", "time": "15 mins ago", "location": "Vadodara Campus"},
    {"id": 2, "donor": "Royal Hotel & Banquet", "item": "Assorted Paneer & Rotis", "qty": "25 kg", "servings": "50 Meals", "status": "Claimed by Hope Foundation", "time": "1 hour ago", "location": "Alkapuri, Vadodara"},
    {"id": 3, "donor": "Green Leaves Event Hall", "item": "Mixed Vegetable Pulao", "qty": "10 kg", "servings": "20 Meals", "status": "Available", "time": "30 mins ago", "location": "Waghodia Road, Vadodara"}
]

@bp.route('/api/food-waste/items', methods=['GET'])
def get_food_items():
    return jsonify({'items': FOOD_ITEMS_STORE})

@bp.route('/api/food-waste/donate', methods=['POST'])
def donate_food():
    data = request.get_json() or {}
    donor = data.get('donor', 'Anonymous Donor')
    item = data.get('item', 'Surplus Meals')
    qty = data.get('qty', '5 kg')
    servings = data.get('servings', '10 Meals')
    location = data.get('location', 'Vadodara')

    new_id = len(FOOD_ITEMS_STORE) + 1
    new_item = {
        "id": new_id,
        "donor": donor,
        "item": item,
        "qty": qty,
        "servings": servings,
        "status": "Available",
        "time": "Just now",
        "location": location
    }
    FOOD_ITEMS_STORE.insert(0, new_item)
    return jsonify({'status': 'success', 'message': 'Food donation listed successfully in real-time!', 'item': new_item})

@bp.route('/api/food-waste/claim/<int:item_id>', methods=['POST'])
def claim_food(item_id):
    for item in FOOD_ITEMS_STORE:
        if item['id'] == item_id:
            item['status'] = 'Claimed by Local NGO'
            return jsonify({'status': 'success', 'message': f"Item '{item['item']}' successfully claimed for redistribution!"})
    return jsonify({'status': 'error', 'message': 'Item not found.'}), 404

@bp.route('/resume/view')
def view_resume():
    return render_template('resume.html')
