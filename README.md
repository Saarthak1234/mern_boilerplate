# MERN Boilerplate

A minimal full-stack boilerplate with **Node.js (Express)** backend and **React + Vite** frontend.

## 📁 Structure

```
mern_boilerplate/
│
├── server/               # Node.js + Express backend
│   └── server.js         # Main entry point
│
├── client/               # React + Vite frontend
│   └── (Vite project files)
│
├── README.md
└── package.json          # Optional root scripts
```

## 🚀 Getting Started

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/mern_boilerplate.git

# Navigate to project folder
cd mern_boilerplate
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install express nodemon

# Start development server
nodemon server.js
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the server directory:

```
PORT=3000
# Add any other env variables as needed
```

## 🛠️ Built With

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
