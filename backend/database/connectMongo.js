const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Mongo");
    } catch (error) {
        console.error("Failed to connect to Mongo", error.message);
        process.exit(1); //code 1 for failure, code 0 for success
    }
}

module.exports = connectMongo;