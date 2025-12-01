//Basic Express server setup
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import passport from './utils/passport.js';
import session from 'express-session';
import cors from 'cors';


dotenv.config();
// connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173", // Your React dev server
    credentials: true,
}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        sameSite: 'lax',
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log("Root endpoint hit");
    res.send('Hello World!');
})

app.use("/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})