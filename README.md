# MERN Boilerplate

A reusable MERN stack authentication boilerplate designed to be easily integrated into any existing or new MERN application. This repository focuses exclusively on authentication logic and UI, allowing developers to use the backend, frontend, or both independently based on project requirements.

This README serves as a usage reference rather than a tutorial.

## Overview
This project provides a complete authentication system following modern security practices. It is intended to be used as a foundation for production-ready applications or as a modular authentication layer that can be extended as required.

Key Features:

- Email and password authentication
- OTP-based email verification using Nodemailer
- JWT-based authentication
- Secure password hashing
- Google OAuth 2.0 authentication
- GitHub OAuth authentication
- Express session management
- Modular MVC backend architecture
- Frontend built using React, Vite, and shadcn/ui

## Project Structure

```
mern-auth-boilerplate/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/
│   └── src/
│       ├── Pages/
│       │   └── Home/
│       │       └── HomePage.jsx
│       ├── authPages/
│       │   ├── Login/
│       │   ├── signup/
│       │   └── verify/
│       ├── components/
│       ├── assets/
│       ├── lib/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                     # Backend (Node.js + Express)
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   ├── db.js
│   │   ├── generateToken.js
│   │   └── passport.js
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json (optional root scripts)

```

## Usage Philosophy

This repository is designed as a modular authentication layer.

You may:
- Use only the backend authentication logic in an existing MERN project
- Use only the frontend authentication UI with your own backend
- Use both client and server together as a complete authentication system

No part of the codebase is tightly coupled to business-specific logic.

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/mern-auth-boilerplate.git
cd mern-auth-boilerplate
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev

```

### Environment Variables

Create a .env file inside the server directory and configure the following variables:

```
PORT=5000
MONGO_URI=
JWT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

# Session
SESSION_SECRET=secret_session_key

# Email (Nodemailer)
EMAIL_USER=
EMAIL_APP_PASSWORD=
```
Ensure that OAuth callback URLs exactly match those configured in the Google and GitHub developer dashboards.

## API Routes

All authentication-related routes are grouped under the authentication router.

###Email and OTP Authentication
```bash
POST    /api/auth/signup        Register a new user
POST    /api/auth/login         Login using email and password
PATCH   /api/auth/verify        Verify user using OTP
PATCH   /api/auth/update        Update user profile details
PATCH   /api/auth/resendotp     Resend OTP for email verification
```
###OAuth Authentication
GitHub OAuth
```bash
GET     /api/auth/github
GET     /api/auth/github/callback
```
Google OAuth
```bash
GET     /api/auth/google
GET     /api/auth/google/callback
```

OAuth authentication is handled using Passport.js strategies. On successful authentication, the user is processed by the OAuth success handler. Failed authentication attempts are redirected to the configured failure handler.

## Technology Stack
### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- Passport.js
- Nodemailer

### Frontend

- React
- Vite
- shadcn/ui
- Tailwind CSS

## Notes
This project provides a strong authentication foundation, not a complete application
Additional validation, role-based access control, and authorization layers can be implemented as needed
Route prefixes and middleware can be modified without changing core authentication logic
Suitable for learning, rapid prototyping, and production extension

## License
This project is free to use, modify, and integrate into both personal and commercial applications.
