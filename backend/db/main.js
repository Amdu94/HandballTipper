const connectToDatabase = require("./connectToDatabase");
const disconnectFromDatabase = require("./disconnectFromDatabase");
const populateMatches = require("./populate/populateMatches");

const main = async () => {
    const mongoUrl = "mongodb://localhost:27017";

    if (!mongoUrl) {
        console.error("Missing MONGO_URL environment variable");
        process.exit(1);
    }

    try {
        await connectToDatabase(mongoUrl);
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
