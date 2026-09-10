# Yamini Parmar - Developer Portfolio Website

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Flask](https://img.shields.io/badge/Framework-Flask-black?logo=flask)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

Welcome to the official developer portfolio repository of **Yamini Parmar**, 3rd Year B.Tech Information Technology Student at Parul University, Vadodara.

---

## 🌟 Overview & Highlights

This repository contains a full-stack, responsive, interactive developer portfolio application built using **Python Flask**, **HTML5**, **CSS3 (Glassmorphism & Adaptive Dark/Light Mode)**, and **JavaScript (ES6+)**.

### Key Features:
- **Hero Section**: Dynamic typewriter title animation, quick stat badges (3rd Year B.Tech IT, CGPA 7.31), and a syntax-highlighted Python developer code preview.
- **Interactive AI College Chatbot Simulator**: Embedded NLP chatbot allowing visitors to test real-time campus query interactions (Admissions, IT Courses, Library Hours, Exam Schedules).
- **Food Waste Management System Simulator**: Interactive excess food redistribution platform preview featuring real-time food listings, NGO food claims, and donation listing forms.
- **Interactive Skills & Certifications Matrix**: Filterable technical skills (Python, Java, C, Web Technologies, Tools) and verified certifications (Pearson HTML & CSS, IBM Python for Data Science, IBM Statistics 101).
- **In-Browser Resume & Printable CV**: Formatted resume viewer with a dedicated printable route (`/resume/view`).
- **Working Contact Form**: AJAX-powered contact form connected to an SQLite database with real-time toast notification alerts.
- **Adaptive Dark/Light Theme**: Theme switcher with local storage persistence.

---

## 📁 Repository Structure

```
WEB_APP/
├── app.py              # Application factory & server entrypoint
├── config.py           # Configuration settings & database URI
├── models.py           # SQLAlchemy database models (ContactMessage, Project, Skill, etc.)
├── routes.py           # Application blueprints, API routes & simulator endpoints
├── seed.py             # Database seeder script
├── README.md           # Project documentation
├── .gitignore          # Git ignore rules
├── static/
│   ├── css/
│   │   └── style.css   # Main stylesheet (Glassmorphism, CSS variables, dark/light themes)
│   └── js/
│       └── main.js     # Modular JavaScript (Theme switch, Modals, Chatbot & Form handling)
└── templates/
    ├── base.html       # Layout template with navigation, toast container & footer
    ├── index.html      # Main portfolio single-page application
    └── resume.html     # Dedicated printable resume view
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Python 3.8+ installed on your system.

### Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Yamini-2516/portfolio-.git
   cd portfolio-
   ```

2. **Install Dependencies**:
   ```bash
   pip install flask flask-sqlalchemy flask-login
   ```

3. **Seed Database**:
   ```bash
   python seed.py
   ```

4. **Run Application Server**:
   ```bash
   python app.py
   ```

5. **Open Browser**:
   Navigate to `http://127.0.0.1:5000` to explore the portfolio!

---

## 📬 Contact & Connect

- **Email**: [yaminiparmar2516@gmail.com](mailto:yaminiparmar2516@gmail.com)
- **GitHub**: [github.com/Yamini-2516](https://github.com/Yamini-2516)
- **University**: Parul University, Vadodara, Gujarat, India

---
*Created & Engineered by Yamini Parmar*
