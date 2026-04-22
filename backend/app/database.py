from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database URL - SQLite for development (no server needed)
# For PostgreSQL, use: postgresql://postgres:password@localhost/inventory_mgmt

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./inventory_mgmt.db"  # SQLite - creates local database file
)

# For SQLite, we need different engine parameters
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
