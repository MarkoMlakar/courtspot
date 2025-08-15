# CourtSpot - Court Discovery App

A full-stack web application for discovering and reviewing sport courts in your area.

## 🏗️ Project Structure

```
courtspot/
├── client/          # React + TypeScript frontend (Vite)
├── server/          # Node.js + Express backend
├── e2e/            # Playwright end-to-end tests
└── README.md       # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### 1. Database Setup

#### Install MySQL

- **macOS**: `brew install mysql`
- **Ubuntu/Debian**: `sudo apt install mysql-server`
- **Windows**: Download from [MySQL official site](https://dev.mysql.com/downloads/mysql/)

#### Start MySQL Service

```bash
# macOS
brew services start mysql

# Ubuntu/Debian
sudo systemctl start mysql

# Windows
net start mysql
```

#### Create Database

```bash
mysql -u root -p
CREATE DATABASE courtspot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Import Schema

```bash
cd server
mysql -u root -p courtspot < src/database/courtspot_schema.sql
```

### 2. Environment Configuration

#### Server Environment

Create `.env` file in `server/` directory:

```bash
# Database Configuration
DB_HOST_DEV=localhost
DB_PORT_DEV=3306
DB_USER_DEV=root
DB_PASSWORD_DEV=your_password_here
DB_NAME_DEV=courtspot

# Production (optional)
DB_HOST_PROD=your_production_host
DB_PORT_PROD=3306
DB_USER_PROD=your_production_user
DB_PASSWORD_PROD=your_production_password
DB_NAME_PROD=courtspot_production
```

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed database with sample data (optional)
npm run seed

# Start development server
npm start
```

**Server will run on:** `http://localhost:3000`

### 4. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Client will run on:** `http://localhost:5173`

### 5. Testing Setup

```bash
cd e2e

# Install dependencies
npm install

# Run tests
npm test

# Run tests in headed mode
npx playwright test --headed
```

## 🛠️ Available Scripts

### Server Scripts

```bash
npm start          # Start development server with nodemon
npm run build      # Build TypeScript to JavaScript
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
```

### Client Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### E2E Scripts

```bash
npm test           # Run all tests
npm run test:ui    # Run tests with Playwright UI
```

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

- **users** - User accounts and profiles
- **courts** - Basketball court information
- **locations** - Geographic coordinates and addresses
- **sports** - Sport types and categories
- **favorites** - User's favorite courts
- **sightings** - Court visit records

## 🔧 Technology Stack

### Backend

- **Node.js** + **Express.js** - Server framework
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Relational database
- **Knex.js** - SQL query builder
- **Objection.js** - ORM layer
- **bcrypt** - Password hashing

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **SCSS** - CSS preprocessor
- **MobX** - State management
- **React Router** - Client-side routing

### Testing

- **Playwright** - End-to-end testing
- **Jest** - Unit testing framework

## 📁 Key Directories

- `client/src/components/` - React components
- `client/src/pages/` - Page components
- `client/src/stores/` - MobX state stores
- `client/src/services/` - API service layer
- `server/src/controllers/` - API controllers
- `server/src/models/` - Database models
- `server/src/routes/` - API route definitions

## 🚨 Troubleshooting

### Database Connection Issues

- Verify MySQL service is running
- Check environment variables in `.env` file
- Ensure database `courtspot` exists
- Verify user permissions

### Port Conflicts

- Server runs on port 3000
- Client runs on port 5173
- Change ports in respective config files if needed

### Build Issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript version compatibility
- Verify all environment variables are set

## 📚 Learning Resources

This project demonstrates:

- **Full-stack development** with Node.js and React
- **Database design** with MySQL and Objection.js
- **State management** with MobX
- **Type safety** with TypeScript
- **Testing strategies** with Playwright
- **Modern build tools** with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes.
