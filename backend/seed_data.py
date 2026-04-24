import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from inventory.models import Product, User


def create_or_update_user(username, email, password, full_name, is_admin):
    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            "email": email,
            "full_name": full_name,
            "is_active": True,
            "is_admin": is_admin,
        },
    )
    if created:
        user.set_password(password)
        user.save()
    return created


def seed_users():
    created_admin = create_or_update_user(
        "admin", "admin@example.com", "admin123", "Admin User", True
    )
    created_user = create_or_update_user(
        "user", "user@example.com", "user123", "Test User", False
    )
    created_manager = create_or_update_user(
        "manager", "manager@example.com", "manager123", "Store Manager", False
    )

    if created_admin or created_user or created_manager:
        print("Seed users created successfully")
    else:
        print("Seed users already exist")

    print("\nTest Credentials:")
    print("-" * 40)
    print("Admin:")
    print("  Username: admin")
    print("  Password: admin123")
    print("\nTest User:")
    print("  Username: user")
    print("  Password: user123")
    print("\nStore Manager:")
    print("  Username: manager")
    print("  Password: manager123")
    print("-" * 40)


def seed_products():
    products = [
        {
            "name": "Cement Bag",
            "sku": "CEM-001",
            "category": "Construction",
            "description": "50kg bag for site supply",
            "unit": "bag",
            "quantity": 250,
            "unit_price": "540.00",
            "is_active": True,
        },
        {
            "name": "Steel Rod 12mm",
            "sku": "STL-012",
            "category": "Construction",
            "description": "12mm reinforcement rod",
            "unit": "piece",
            "quantity": 120,
            "unit_price": "890.00",
            "is_active": True,
        },
    ]

    created_any = False
    for data in products:
        _, created = Product.objects.get_or_create(sku=data["sku"], defaults=data)
        created_any = created_any or created

    if created_any:
        print("Seed products created successfully")
    else:
        print("Products already exist")


if __name__ == "__main__":
    print("Starting database seeding...")
    seed_users()
    seed_products()
    print("\nSeeding complete")
