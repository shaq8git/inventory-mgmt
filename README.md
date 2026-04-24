# Inventory Management System

A full-stack store requisition and inventory management application built with **React**, **Django**, and **PostgreSQL**.

## 📋 Features

- **User Authentication** - Secure login with JWT tokens
- **Admin Dashboard** - Role-based access control
- **Basic Setup**
  - Product Groups
  - Product Information
  - Opening Balance
- **Transaction Management**
  - Stock Register
  - Distribution
  - Purchase Planning
- **User Management**
  - User Registration
  - User Roles
  - User Permissions

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API layer
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Django ORM** - Data access

## ⚡ Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Automated Setup (Recommended)

```bash
# Make script executable
chmod +x quickstart.sh

# Run setup
./quickstart.sh
```

### Manual Setup

#### Backend
```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Create database
createdb inventory_mgmt

# Run migrations
python manage.py migrate

# Seed test data
python seed_data.py

# Start server
python manage.py runserver 8001
```

#### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Start dev server
npm run dev
```

## 🧪 Testing

1. **Backend** - http://localhost:8001 (API)
2. **Frontend** - http://localhost:3000

### Test Credentials
```
Admin:
  Username: admin
  Password: admin123

Test User:
  Username: user
  Password: user123

Manager:
  Username: manager
  Password: manager123
```

## 📚 Documentation

- [Full Setup Guide](./SETUP_GUIDE.md) - Complete installation and configuration
- [Frontend README](./frontend/README.md) - Frontend-specific setup
- [Backend README](./backend/README.md) - Backend-specific setup (if exists)

## 🎯 Project Structure

```
inventory-mgmt/
├── backend/                 # Django backend
│   ├── config/             # Django project settings
│   ├── inventory/          # Models, serializers, views, urls
│   ├── manage.py
│   ├── seed_data.py        # Initialize data
│   └── requirements.txt    # Python deps
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configs
│   │   ├── services/      # API, auth
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── SETUP_GUIDE.md          # Comprehensive setup

```

## 🔑 Key Features Implemented

✅ **Login Page** - Secure authentication with JWT
✅ **Logout** - Clear session and redirect to login
✅ **Protected Routes** - Redirect unauthenticated users to login
✅ **User Avatar Dropdown** - Profile and logout options
✅ **Sidebar Navigation** - Multi-level menu structure
✅ **Responsive Layout** - Dashboard with main content area

## 🚀 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
python manage.py runserver 8001            # Development
python manage.py migrate                   # Apply migrations
python seed_data.py                        # Initialize data
```

## 🐛 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database if missing
createdb inventory_mgmt
```

### "npm: command not found"
Install Node.js from https://nodejs.org/

### "Python module not found"
```bash
cd backend
pip install -r requirements.txt
```

### "Port already in use"
Change the port in `python manage.py runserver` or the Vite config

## 🔐 Security Notes

⚠️ **Development Only** - Not production-ready:
- Change `SECRET_KEY` in `backend/.env`
- Enable HTTPS in production
- Use environment variables for sensitive data
- Implement rate limiting
- Add CSRF protection for forms


## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
