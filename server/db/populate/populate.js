require("dotenv").config();
const mongoose = require("mongoose");
const matchModel = require("../match.model");
const matchApi = require("../api/matchApi");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const populateMatches = async () => {
    await matchModel.deleteMany({});

    const fetchedMatches = await matchApi();

    const matchesToDb = fetchedMatches.response.map((match) => ({
        home: match.teams.home.name,
        away: match.teams.away.name,
        date: match.date,
        homeScore: match.scores.home,
        awayScore: match.scores.away,
    }));

    await matchModel.create(...matchesToDb);
    console.log("Matches created");
};

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateMatches();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});


