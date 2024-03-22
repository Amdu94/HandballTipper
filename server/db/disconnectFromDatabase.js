const mongoose = require("mongoose");

const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from database");
    } catch (error) {
        console.error("Error disconnecting from database:", error);
        process.exit(1);
    }
};

module.exports = disconnectFromDatabase;
