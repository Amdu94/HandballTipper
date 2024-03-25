const mongoose = require("mongoose");
const matchModel = require("../models/match.model");
const userModel = require("../models/user.model");
const matchApi = require("../api/matchApi");

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
            home: match.teams.home.name,
            away: match.teams.away.name,
            date: match.date,
            homeScore: match.scores.home,
            awayScore: match.scores.away,
            guesses: []
        }));

        await matchModel.create(matchesToDb);
        await userModel.create();

        console.log("Matches created");
        console.log("Users created");

    };


module.exports = populateMatches;

