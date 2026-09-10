from models import db, Project, Certification, Skill

def seed_data():
    # Projects
    projects = [
        Project(
            title="AI College Chatbot",
            subtitle="Campus Intelligence & Student Query Assistant",
            description="Developed an intelligent conversational chatbot using Python and Natural Language Processing (NLP) techniques. Designed specifically to assist university students with real-time campus queries including admissions, course syllabi, fee structures, library hours, and examination schedules.",
            tech_stack="Python, NLTK, Flask, JavaScript, HTML5/CSS3",
            category="AI & NLP",
            github_url="https://github.com/Yamini-2516",
            demo_type="chatbot",
            icon_name="bot"
        ),
        Project(
            title="Food Waste Management System",
            subtitle="Real-Time Food Redistribution Platform",
            description="Created a dynamic web-based platform to bridge the gap between food donors (restaurants, events, canteens) and local NGOs/shelters. Features an intuitive user-friendly interface with real-time food availability tracking, instant request claiming, and inventory management.",
            tech_stack="HTML5, CSS3, JavaScript, Python Flask, SQLite",
            category="Web Application",
            github_url="https://github.com/Yamini-2516",
            demo_type="food_waste",
            icon_name="heart-handshake"
        )
    ]

    # Certifications
    certifications = [
        Certification(
            title="Pearson Certification: HTML & CSS",
            issuer="Pearson",
            badge_color="#e06d53",
            verify_url="#"
        ),
        Certification(
            title="IBM Professional Certificate: Python for Data Science",
            issuer="IBM",
            badge_color="#054ada",
            verify_url="#"
        ),
        Certification(
            title="IBM Certificate: Statistics 101",
            issuer="IBM",
            badge_color="#1070e0",
            verify_url="#"
        )
    ]

    # Skills
    skills = [
        # Languages
        Skill(name="Python", category="languages", proficiency=90, icon="python"),
        Skill(name="Java", category="languages", proficiency=82, icon="java"),
        Skill(name="C", category="languages", proficiency=78, icon="c"),
        # Web Tech
        Skill(name="HTML5", category="web", proficiency=95, icon="html5"),
        Skill(name="CSS3", category="web", proficiency=90, icon="css3"),
        Skill(name="JavaScript", category="web", proficiency=85, icon="javascript"),
        # Tools
        Skill(name="VS Code", category="tools", proficiency=95, icon="code"),
        Skill(name="Git", category="tools", proficiency=88, icon="git"),
        Skill(name="GitHub", category="tools", proficiency=90, icon="github"),
        Skill(name="Thunder Client", category="tools", proficiency=85, icon="zap"),
        # Soft Skills
        Skill(name="Problem-Solving", category="soft", proficiency=92, icon="brain"),
        Skill(name="Teamwork & Communication", category="soft", proficiency=90, icon="users"),
        Skill(name="Quick Learner", category="soft", proficiency=95, icon="rocket")
    ]

    db.session.add_all(projects)
    db.session.add_all(certifications)
    db.session.add_all(skills)
    db.session.commit()
    print("Database successfully seeded with Yamini Parmar's portfolio data!")

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_data()
