const express = require('express');
const connectMongo = require('./database/connectMongo.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require("./routes/auth.js")

app.get("/", (req, res) => {
    res.send("hello yeah!")
})

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    connectMongo();
    console.log(`Server is running on port 5000`)
})


