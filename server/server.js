//Basic Express server setup
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import User from './models/userModel.js';
dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use("/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})