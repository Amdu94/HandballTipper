import populateMatches from "./populate/populateMatches.js";
import connectToDatabase from "./connectToDatabase.js";
import disconnectFromDatabase from "./disconnectFromDatabase.js";
import dotenv from 'dotenv'
dotenv.config();

const main = async () => {

    const MONGO_URL = process.env.MONGO_URL;

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
