const mongoose = require("mongoose");

const connectToDatabase = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
