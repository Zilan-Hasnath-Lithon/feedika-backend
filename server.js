import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Home, Login, Profile, Signup, Youtube,Tiktok,Facebook, AdminLogin } from './routes/index.routes.js';
import FeedMakerRoute from './routes/feedmaker.routes.js'

dotenv.config();

mongoose.connect(process.env.MONGOOSEdb)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true               
}));

app.use('/api/login', Login);
app.use('/api/profile', Profile);
app.use('/api/signup', Signup);
app.use('/api/youtube', Youtube);
app.use('/api/facebook', Facebook);
app.use('/api/tiktok', Tiktok);
app.use('/api/admin', AdminLogin)
app.use('/api/feedmaker', FeedMakerRoute)
app.use('/api/home', Home)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
