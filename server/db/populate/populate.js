require("dotenv").config();
const mongoose = require("mongoose");
const matchModel = require("../match.model");
const userModel = require("../user.model");
const matchApi = require("../api/matchApi");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const populateMatches = async () => {

    const fetchedMatches = await matchApi();

    const existingMatches = await matchModel.find();

    const matchesToAdd = fetchedMatches.response.filter(newMatch => {
        return !existingMatches.some(existingMatch =>
            existingMatch.home === newMatch.teams.home.name &&
            existingMatch.away === newMatch.teams.away.name &&
            existingMatch.date.getTime() === new Date(newMatch.date).getTime()
        );
    });

    const matchesToDb = matchesToAdd.map(match => ({
        _id: new mongoose.Types.ObjectId(match.id),
        home: match.teams.home.name,
        away: match.teams.away.name,
        date: match.date,
        homeScore: match.scores.home,
        awayScore: match.scores.away,
        guesses: []
    }));

    const createdMatches = await matchModel.create(...matchesToDb);

    await userModel.create();

    console.log("Matches created");
    return createdMatches;
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


