const express = require('express');
const connectMongo = require('./database/connectMongo.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const authRoutes = require("./routes/auth.js")

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectMongo();
    console.log(`Server is running on port ${PORT}`)
})


