const cors = require('cors');

const express = require('express');
const connectMongo = require('./database/connectMongo.js');
const cookieParser = require('cookie-parser');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.DEVELOPMENT_CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.js")

app.use('/api/auth', authRoutes);

const startServer = async () => {
    try {
        await connectMongo();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB. Server not started.");
    }
};

startServer();
