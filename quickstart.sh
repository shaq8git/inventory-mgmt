#!/bin/bash

# Quick Start Script for Inventory Management System

echo "╔════════════════════════════════════════════════╗"
echo "║   Inventory Management System - Quick Start   ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "${BLUE}📋 Checking prerequisites...${NC}"

if ! command -v python3 &> /dev/null; then
    echo "✗ Python3 not found. Please install Python 3.8+"
    exit 1
fi
echo "✓ Python3 found: $(python3 --version)"

if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

if ! command -v psql &> /dev/null; then
    echo "✗ PostgreSQL not found. Please install PostgreSQL"
    exit 1
fi
echo "✓ PostgreSQL found"

echo ""

# Setup Backend
echo "${BLUE}⚙️ Setting up Backend...${NC}"

cd backend

if [ ! -f "requirements.txt" ]; then
    echo "✗ requirements.txt not found"
    exit 1
fi

echo "Installing Python dependencies..."
pip install -r requirements.txt -q

if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed"
else
    echo "✗ Failed to install backend dependencies"
    exit 1
fi

# Create database
echo ""
echo "Creating database..."
createdb inventory_mgmt 2>/dev/null || echo "✓ Database inventory_mgmt already exists"

# Seed data
echo "Creating seed data..."
python seed_data.py

cd ..

echo ""

# Setup Frontend
echo "${BLUE}⚙️ Setting up Frontend...${NC}"

cd frontend

echo "Installing Node dependencies..."
npm install --quiet

if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed"
else
    echo "✗ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "${GREEN}✓ Setup Complete!${NC}"
echo ""
echo "${YELLOW}📝 Next Steps:${NC}"
echo ""
echo "1. ${BLUE}Start Backend${NC} (Terminal 1):"
echo "   cd backend"
echo "   uvicorn app.main:app --reload --port 8000"
echo ""
echo "2. ${BLUE}Start Frontend${NC} (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. ${BLUE}Open Browser${NC}:"
echo "   http://localhost:3000"
echo ""
echo "${YELLOW}Test Credentials:${NC}"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
