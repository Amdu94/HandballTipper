require("dotenv").config();
const mongoose = require("mongoose");
const matchModel = require("../match.model");
const guessModel = require("../guess.model");
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
        _id: new mongoose.Types.ObjectId(match.id),
        home: match.teams.home.name,
        away: match.teams.away.name,
        date: match.date,
        homeScore: match.scores.home,
        awayScore: match.scores.away,
        homeGuess: null,
        awayGuess: null,
    }));

    const createdMatches = await matchModel.create(...matchesToDb);
    console.log("Matches created");
    return createdMatches;
};

const populateGuesses = async (matches) => {

    await guessModel.deleteMany({});

    const guessesToDb = matches.map((match) => ({
        _id: match._id,
        match: `${match.home} - ${match.away}`,
        guesses: [
            {
                name: "admin",
                homeScore: 10,
                awayScore: 20,
            },
            {
                name: "admin2",
                homeScore: 20,
                awayScore: 10,
            }
        ]
    }));

    await guessModel.create(guessesToDb);
    console.log("Guesses created");
};

const main = async () => {
    await mongoose.connect(mongoUrl);

    const createdMatches = await populateMatches();

    await populateGuesses(createdMatches);

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});


