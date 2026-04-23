# Backend - Inventory Management System

FastAPI-based REST API for the Inventory Management System.

## 🛠️ Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Database

Copy the sample env file and point it at PostgreSQL:

```bash
cp .env.example .env
export DATABASE_URL="postgresql+psycopg2://inventory_app:inventory_app_password@localhost:5432/inventory_mgmt"
```

### 3. Create Database

```bash
psql -U postgres -f sql/init_postgresql.sql
```

### 4. Seed Test Data

```bash
python seed_data.py
```

### 5. Start Server

```bash
uvicorn app.main:app --reload --port 8000
```

## 📚 API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🗂️ Project Structure

```
app/
├── core/
│   ├── __init__.py
│   └── security.py          # JWT & Password utilities
├── models/
│   └── __init__.py          # SQLAlchemy models (User, etc.)
├── routes/
│   ├── auth.py              # /auth/login
│   ├── products.py          # Product endpoints
│   ├── transactions.py      # Transaction endpoints
│   └── users.py             # User management
├── schemas/
│   └── __init__.py          # Pydantic models
├── database.py              # SQLAlchemy setup
└── main.py                  # FastAPI app

seed_data.py                 # Create test users
requirements.txt             # Dependencies
```

## 🔑 Environment Variables

```bash
DATABASE_URL=postgresql://user:password@localhost/inventory_mgmt
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 📋 Database Schema

### users table
```sql
id (Integer, PK)
username (String, Unique)
email (String, Unique)
password_hash (String)
full_name (String)
is_active (Boolean, default=True)
is_admin (Boolean, default=False)
created_at (DateTime, auto)
```

### products table
```sql
id (Integer, PK)
name (String, Unique)
sku (String, Unique)
category (String)
description (Text)
unit (String)
quantity (Integer)
unit_price (Numeric(10,2))
is_active (Boolean, default=True)
created_at (DateTime, auto)
```

## 🔐 Authentication

Uses JWT (JSON Web Tokens) with the following flow:

1. **Login** - POST `/auth/login` with username & password
2. **Receive Token** - JWT token returned in response
3. **Include in Requests** - Add `Authorization: Bearer <token>` header
4. **Token Validation** - Server validates token on each request

### Login Example

```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username":"admin",
    "password":"admin123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "full_name": "Admin User",
    "is_active": true,
    "is_admin": true
  }
}
```

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ CORS protection
- ✅ SQL injection prevention (SQLAlchemy)
- ⚠️ **TODO:** Rate limiting
- ⚠️ **TODO:** CSRF protection
- ⚠️ **TODO:** Input validation

## 🧪 Testing Endpoints

### Health Check
```bash
curl http://localhost:8000/
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Protected Endpoint (requires token)
```bash
curl http://localhost:8000/protected \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🚀 Development

### Hot Reload
The `--reload` flag enables hot reload during development:
```bash
uvicorn app.main:app --reload
```

### Debug Mode
Set environment variable:
```bash
export DEBUG=True
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.104.1 | Web framework |
| uvicorn | 0.24.0 | ASGI server |
| sqlalchemy | 2.0.23 | ORM |
| psycopg2-binary | 2.9.9 | PostgreSQL adapter |
| python-jose | 3.3.0 | JWT handling |
| passlib | 1.7.4 | Password utilities |
| bcrypt | 4.1.1 | Password hashing |
| pydantic | 2.5.0 | Data validation |

## 🐛 Common Issues

### "ModuleNotFoundError: No module named 'app'"
```bash
# Make sure you're running from the backend directory
cd backend
uvicorn app.main:app --reload
```

### "sqlalchemy.exc.OperationalError: could not connect to server"
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database and role
psql -U postgres -f sql/init_postgresql.sql
```

### Password auth fails because of `md5` / `scram-sha-256`

If PostgreSQL was initialized for `scram-sha-256` but `pg_hba.conf` still says `md5`, login can fail. Fix by updating the host lines in `pg_hba.conf` to `scram-sha-256`, then reload PostgreSQL:

```conf
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
```

Then run:

```bash
sudo systemctl reload postgresql
```

If you intentionally want `md5`, set `password_encryption = md5` in `postgresql.conf`, reset the user password, and reload the service.

### "CORS error from frontend"
Check `app/main.py` CORS configuration includes your frontend URL.

## 📝 Endpoint Documentation

### Authentication
- `POST /auth/login` - Login with credentials

### Products
- `GET /products` - List all products
- `POST /products` - Create product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Users
- `GET /users` - List users
- `POST /users` - Create user
- `GET /users/{id}` - Get user details
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Transactions
- `GET /transactions` - List transactions
- `POST /transactions` - Create transaction

## 🔄 Request/Response Examples

### All requests should include:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

## 🚀 Deployment

### Production Checklist
- [ ] Change `SECRET_KEY` to secure random value
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set `DEBUG=False`
- [ ] Use Gunicorn instead of uvicorn
- [ ] Add rate limiting
- [ ] Add logging
- [ ] Set up database backups
- [ ] Enable monitoring

### Example Gunicorn
```bash
gunicorn app.main:app -w 4 -b 0.0.0.0:8000
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

**Happy Coding!** 🚀
