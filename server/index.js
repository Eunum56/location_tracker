import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import Routes from "./locationRoute.js";
configDotenv();

const app = express();

const corsOption = {
    origin: 'https://youtube-video-teal.vercel.app',
    methods: ['POST', 'GET'],
    credentials: true,
    allowedHeaders: ['Content-Type']
};


app.use(cors(corsOption)); // CORS middleware

app.use(express.json()); // JSON middleware

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error while connecting DataBase ${error}`);
        process.exit(1)
    }
};




// Route to handle incoming location data
app.use("/api", Routes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
});