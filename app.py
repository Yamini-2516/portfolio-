from flask import Flask
from config import Config
from models import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        # Seed initial data if empty
        from models import Project
        if not Project.query.first():
            from seed import seed_data
            seed_data()

    from routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app

# Expose WSGI app instance for Vercel Serverless Functions
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
