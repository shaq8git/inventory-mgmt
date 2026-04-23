# Inventory Management System - Full Setup Guide

## ⚠️ Why is localhost:3001 blank?

**The Python HTTP server cannot run React applications properly.**

React needs:
1. **Vite dev server** (during development) - compiles JSX to JavaScript in real-time
2. **Node.js** with `npm` - to run the development server
3. **Hot module reloading** - to see changes instantly

When you serve static files with Python's HTTP server, the browser receives raw JSX/HTML without React compilation.

**Solution:** Install Node.js and run `npm run dev` from the frontend directory.

---

## 📋 System Requirements

- **PostgreSQL** (database)
- **Python 3.8+** (backend)
- **Node.js 16+** (frontend)

---

## 🚀 Backend Setup

### 1. Install Python Dependencies

```bash
cd /home/Sumon/inventory-mgmt/backend
pip install -r requirements.txt
```

### 2. Configure Database

Use PostgreSQL and point the backend at it with an environment variable:

```bash
cd /home/Sumon/inventory-mgmt/backend
cp .env.example .env
export DATABASE_URL="postgresql+psycopg2://inventory_app:inventory_app_password@localhost:5432/inventory_mgmt"
```

### 3. Create Database and Seed Data

```bash
# Create role and database
psql -U postgres -f sql/init_postgresql.sql

# Seed test users and products
python seed_data.py
```

**Output:**
```
Test Credentials:
─────────────────────────────────────
Admin:
  Username: admin
  Password: admin123

Test User:
  Username: user
  Password: user123

Store Manager:
  Username: manager
  Password: manager123
─────────────────────────────────────
```

### 4. Start Backend Server

```bash
cd /home/Sumon/inventory-mgmt/backend
uvicorn app.main:app --reload --port 8000
```

✅ Backend running on: `http://localhost:8000`
📚 API docs: `http://localhost:8000/docs`

---

## 🎨 Frontend Setup

### 1. Install Node.js

If not already installed, download from: https://nodejs.org/

Or use Node Version Manager (nvm):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
nvm use --lts
```

### 2. Install Frontend Dependencies

```bash
cd /home/Sumon/inventory-mgmt/frontend
npm install
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

✅ Frontend running on: `http://localhost:3000`

---

## 🧪 Testing the Complete Application

### Step 1: Start Backend (Terminal 1)
```bash
cd /home/Sumon/inventory-mgmt/backend
export DATABASE_URL="postgresql+psycopg2://inventory_app:inventory_app_password@localhost:5432/inventory_mgmt"
uvicorn app.main:app --reload --port 8000
```

### Step 2: Start Frontend (Terminal 2)
```bash
cd /home/Sumon/inventory-mgmt/frontend
npm run dev
```

### Step 3: Open Application
1. Open browser: `http://localhost:3000`
2. Login with credentials:
   - **Username:** admin
   - **Password:** admin123
3. Test Navigation:
   - Dashboard
   - Basic Setup (Product Group, Product Info, Opening Balance)
   - Transaction (Stock Register, Distribution, Purchase Planning)
   - Users
4. Test Logout:
   - Click user avatar in top-right
   - Click "Logout"
   - You should be redirected to login page

---

## 📁 Project Structure

```
inventory-mgmt/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── security.py          # JWT, password hashing
│   │   ├── models/
│   │   │   └── __init__.py          # Database models
│   │   ├── routes/
│   │   │   ├── auth.py              # Login endpoint
│   │   │   ├── products.py
│   │   │   ├── transactions.py
│   │   │   └── users.py
│   │   ├── schemas/
│   │   │   └── __init__.py          # Pydantic models
│   │   ├── database.py              # SQLAlchemy setup
│   │   └── main.py                  # FastAPI app
│   ├── seed_data.py                 # Create test users
│   └── requirements.txt             # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # With logout ✓
    │   │   ├── Sidebar.jsx          # Navigation menu
    │   │   └── Layout.jsx
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   │   ├── api.js               # Axios + auth headers
    │   │   └── auth.js              # Auth utilities
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## 🔧 Backend Files Created

| File | Purpose |
|------|---------|
| `app/database.py` | SQLAlchemy setup, database connection |
| `app/core/security.py` | Password hashing, JWT token creation |
| `app/models/__init__.py` | User database model |
| `app/schemas/__init__.py` | Pydantic request/response models |
| `app/routes/auth.py` | Login endpoint |
| `app/main.py` | FastAPI application initialization |
| `seed_data.py` | Create test users in database |
| `requirements.txt` | Python packages |

---

## 🐛 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database and role
psql -U postgres -f sql/init_postgresql.sql

# Export DATABASE_URL from backend/.env.example
```

### pgAdmin does not show the `products` table
1. Register the PostgreSQL server in pgAdmin with host `localhost`, port `5432`, maintenance DB `postgres`, and the same username/password used in `DATABASE_URL`.
2. Expand:
   `Servers -> your server -> Databases -> inventory_mgmt -> Schemas -> public -> Tables`
3. Run `python seed_data.py` once, then refresh `Tables`. You should see both `products` and `users`.

### Password authentication fails after the old `md5` workaround
If the server was created with SCRAM passwords, `pg_hba.conf` must usually use `scram-sha-256` instead of `md5`:

```conf
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
```

Reload PostgreSQL after editing:

```bash
sudo systemctl reload postgresql
```

### "npm: command not found"
```bash
# Install Node.js from https://nodejs.org/
# Or use nvm to install it
```

### "npm run dev" fails
```bash
# Clear npm cache and reinstall
cd /home/Sumon/inventory-mgmt/frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "CORS error" when calling backend from frontend
- Ensure backend is running on port 8000
- Check CORS settings in `app/main.py` include your frontend URL

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with username/password |
| GET | `/` | Health check |

### Example Login Request
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
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

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Test users created (`python seed_data.py`)
- [ ] Backend starts without errors (`uvicorn app.main:app --reload`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Can login at `http://localhost:3000`
- [ ] Can navigate between pages
- [ ] Logout works and redirects to login
- [ ] API calls include auth headers

---

## 🚀 Next Steps

After basic setup:
1. Implement remaining routes (products, transactions, users)
2. Add form validations
3. Add error handling
4. Add loading states
5. Add pagination
6. Deploy to production
