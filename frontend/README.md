# Inventory Management System - Frontend

A React-based frontend for the store requisition and inventory management system.

## Tech Stack
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Tailwind CSS** - Styling (via CDN)

## Features
- User authentication (login/logout)
- Admin dashboard with sidebar navigation
- Product management (groups, info, opening balance)
- Transaction management (stock register, distribution, purchase planning)
- User management (registration, roles, permissions)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend will be available at: `http://localhost:3000`
   - Backend should be running at: `http://localhost:8000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── ... (other pages)
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .eslintrc.json
```

## API Integration

The frontend communicates with a FastAPI backend. API calls are configured in:
- `src/services/api.js` - Axios instance with base URL and auth headers
- `src/services/auth.js` - Authentication utilities

## Navigation Structure

- **Basic Setup**
  - Product Group
  - Product Info
  - Opening Balance

- **Transaction**
  - Stock Register
  - Distribution
  - Purchase Planning

- **Users**
  - User Registration
  - User Role
  - User Permission

## Testing the Application

1. **Start the backend** (FastAPI server on port 8000)
2. **Start the frontend** (`npm run dev` on port 3000)
3. **Access the application** at `http://localhost:3000`
4. **Login** with valid credentials
5. **Navigate** through the sidebar menu
6. **Test logout** functionality from the top-right dropdown

## Development Notes

- Uses React Router for client-side routing
- Protected routes redirect to login if not authenticated
- Authentication tokens are stored in localStorage
- API requests automatically include auth headers
- Tailwind CSS is loaded via CDN in index.html