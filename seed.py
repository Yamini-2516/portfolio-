from app import create_app
from models import db, Product, User
from werkzeug.security import generate_password_hash

app = create_app()

def seed_db():
    with app.app_context():
        db.drop_all()
        db.create_all()
        
        if User.query.first() is None:
            admin = User(name='Admin', email='admin@example.com')
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit() # Commit after adding admin
            print("Admin user created.")

        if Product.query.first() is None:
            products = [
                Product(name='Cyber Headphones X', description='Next-gen wireless headphones with immersive 3D sound.', price=24999.00, model_url='headphone', image_url='/static/images/cyber_headphones.png', stock=50),
                Product(name='Quantum Sneaker', description='Adaptive footwear with auto-lacing technology.', price=15999.00, model_url='sneaker', image_url='/static/images/quantum_sneaker.png', stock=30),
                Product(name='Neon Watch', description='Smartwatch with holographic display.', price=29999.00, model_url='watch', image_url='/static/images/neon_watch.png', stock=100),
                Product(name='Aero Drone', description='4K camera drone with autonomous flight paths.', price=75000.00, model_url='drone', image_url='/static/images/aero_drone.png', stock=15),
                Product(name='VR Goggles V2', description='Ultra high-res virtual reality headset.', price=40000.00, model_url='vr', image_url='/static/images/vr_goggles.png', stock=20),
                Product(name='Mechanical Keyboard Pro', description='RGB mechanical keyboard with custom switches.', price=12000.00, model_url='keyboard', image_url='/static/images/mech_keyboard.png', stock=75),
                Product(name='Holo Smartphone Zenith', description='Futuristic edge-less smartphone with holographic projection capabilities.', price=85000.00, model_url='smartphone', image_url='/static/images/holo_smartphone.png', stock=120),
                Product(name='Cyberpunk Leather Jacket', description='High-tech stylish jacket with neon glowing stripes and climate control.', price=18500.00, model_url='jacket', image_url='/static/images/cyber_jacket.png', stock=80),
                Product(name='Anti-Gravity Hoverboard', description='Sleek floating transit device with powerful anti-gravity thrusters.', price=150000.00, model_url='hoverboard', image_url='/static/images/hoverboard.png', stock=5),
                Product(name='Spectra Smart Glasses', description='Augmented reality glasses featuring seamless data streams and navigation overlays.', price=32000.00, model_url='glasses', image_url='/static/images/smart_glasses.png', stock=45)
            ]
            
            for p in products:
                db.session.add(p)
                
            db.session.commit()
            print("Database seeded with mock products!")
        else:
            print("Database already seeded.")

if __name__ == '__main__':
    seed_db()
