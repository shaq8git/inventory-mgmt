"""
Seed data script to initialize database with test users.
Run: .venv/bin/python seed_data.py
"""

import sys
sys.path.insert(0, '/home/Sumon/inventory-mgmt/backend')

from app.database import SessionLocal, engine, Base
from app.models import User
import bcrypt


def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def create_tables():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created")


def seed_users():
    """Create seed users for testing."""
    db = SessionLocal()
    
    try:
        # Check if admin user already exists
        existing_admin = db.query(User).filter(User.username == "admin").first()
        if existing_admin:
            print("✓ Admin user already exists")
            return
        
        # Create admin user
        admin = User(
            username="admin",
            email="admin@example.com",
            password_hash=hash_password("admin123"),
            full_name="Admin User",
            is_active=True,
            is_admin=True
        )
        db.add(admin)
        
        # Create test user
        test_user = User(
            username="user",
            email="user@example.com",
            password_hash=hash_password("user123"),
            full_name="Test User",
            is_active=True,
            is_admin=False
        )
        db.add(test_user)
        
        # Create store manager
        store_manager = User(
            username="manager",
            email="manager@example.com",
            password_hash=hash_password("manager123"),
            full_name="Store Manager",
            is_active=True,
            is_admin=False
        )
        db.add(store_manager)
        
        db.commit()
        print("✓ Seed users created successfully")
        print("\nTest Credentials:")
        print("─" * 40)
        print("Admin:")
        print("  Username: admin")
        print("  Password: admin123")
        print("\nTest User:")
        print("  Username: user")
        print("  Password: user123")
        print("\nStore Manager:")
        print("  Username: manager")
        print("  Password: manager123")
        print("─" * 40)
        
    except Exception as e:
        db.rollback()
        print(f"✗ Error creating seed data: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    print("Starting database seeding...")
    create_tables()
    seed_users()
    print("\n✓ Seeding complete!")

