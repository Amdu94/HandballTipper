const { pointsCalculator } = require("../../services/pointsCalculator");
const matchModel = require("../models/match.model");

const addNewMatch = async (newMatch, users) => {
    const matchToDb = {
        home: newMatch.teams.home.name,
        away: newMatch.teams.away.name,
        date: newMatch.date,
        homeScore: newMatch.scores.home,
        awayScore: newMatch.scores.away,
        guesses: []
    };
    const newMatchDb = await matchModel.create(matchToDb);

    for (const user of users) {
        user.guesses.push({
            match: newMatchDb._id,
            home: null,
            away: null
        });
        await user.save();
    }

    console.log(`New match added: ${matchToDb.home} vs ${matchToDb.away}`);
};

module.exports = { addNewMatch };
