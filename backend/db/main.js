require('dotenv').config();
const connectToDatabase = require("./connectToDatabase");
const disconnectFromDatabase = require("./disconnectFromDatabase");
const populateMatches = require("./populate/populateMatches");

const main = async () => {
    const { MONGO_URL } = process.env;

    if (!MONGO_URL) {
        console.error("Missing MONGO_URL environment variable");
        process.exit(1);
    }

    try {
        await connectToDatabase(MONGO_URL);
        await populateMatches();
        await disconnectFromDatabase();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
