const cors = require('cors');

const express = require('express');
const cookieParser = require('cookie-parser');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
require('./google-passport/googlePassportConfig.js');

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.DEVELOPMENT_CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/auth.js")

app.use('/api/auth', authRoutes);

const startServer = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        app.listen(PORT, () => {
            console.log(`Server PostGre is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to PostGre. Server not started.");
        console.log(err);
    }
};

startServer();
