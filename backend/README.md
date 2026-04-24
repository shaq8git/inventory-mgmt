# Backend - Inventory Management System

Django-based REST API for the Inventory Management System. The frontend contract stays the same as the previous backend: `/auth`, `/products`, `/users`, and `/transactions`.

## Setup

### 1. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env` if you are not using the sample PostgreSQL credentials.

### 3. Create the database

```bash
psql -U postgres -f sql/init_postgresql.sql
```

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. Seed test data

```bash
python seed_data.py
```

### 6. Start the Django server

```bash
python manage.py runserver 8001
```

API base URL: `http://localhost:8001`

## Project structure

```text
backend/
├── config/                 # Django project settings and root URLs
├── inventory/              # App models, serializers, views, urls
├── manage.py
├── seed_data.py
├── requirements.txt
└── sql/init_postgresql.sql
```

## Environment variables

```bash
DATABASE_URL=postgresql://postgres:newpassword@localhost:5432/inventory_mgmt
SECRET_KEY=change-this-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
TIME_ZONE=Asia/Dhaka
```

## API endpoints

- `GET /` - Health check
- `POST /auth/login` - Login with username/password
- `POST /auth/forgot-password` - Placeholder forgot-password response
- `GET /users/` - List users
- `POST /users/` - Create user
- `GET /users/<id>` - Get user details
- `GET /products/` - List products
- `POST /products/` - Create product
- `GET /products/<id>` - Get product details
- `PUT /products/<id>` - Update product
- `DELETE /products/<id>` - Delete product
- `GET /transactions/` - Placeholder transaction list
- `POST /transactions/` - Placeholder transaction create

## Login example

```bash
curl -X POST "http://localhost:8001/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Notes

- JWTs are still issued on login so the existing frontend auth flow continues to work.
- Django password hashing is used instead of the old manual bcrypt helpers.
- CORS is handled by `django-cors-headers`.

## 🚀 Deployment

### Production Checklist
- [ ] Change `SECRET_KEY` to secure random value
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set `DEBUG=False`
- [ ] Run behind Gunicorn or another WSGI/ASGI process manager
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Set up database backups
- [ ] Enable monitoring

### Example Gunicorn
```bash
gunicorn config.wsgi:application -w 4 -b 0.0.0.0:8001
```

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
