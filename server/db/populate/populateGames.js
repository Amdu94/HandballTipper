const mongoose = require("mongoose");
const matchModel = require("../models/match.model");
const userModel = require("../models/user.model");
const matchApi = require("../api/matchApi");
const games = require("./games.json")
const { pointsCalculator } = require("../../services/pointsCalculator")

const populateMatches = async () => {

    const existingMatches = await matchModel.find();
    const users = await userModel.find();

    // Frissítés vagy hozzáadás minden meccsre az adatbázisban
    for (const newMatch of games.response) {
        const existingMatch = existingMatches.find(match =>
            match.home === newMatch.teams.home.name &&
            match.away === newMatch.teams.away.name &&
            match.date.getTime() === new Date(newMatch.date).getTime()
        );

        if (existingMatch) {
            // Ha a meccs már létezik az adatbázisban, ellenőrizd, hogy az eredmény megváltozott-e
            if (existingMatch.homeScore !== newMatch.scores.home || existingMatch.awayScore !== newMatch.scores.away) {
                // Ha az eredmény megváltozott, frissítsd az adatbázist az új eredménnyel
                existingMatch.homeScore = newMatch.scores.home;
                existingMatch.awayScore = newMatch.scores.away;
                await existingMatch.save();
                console.log(`Match result updated for ${existingMatch.home} vs ${existingMatch.away}`);
                await pointsCalculator(existingMatch._id)
            }
        } else {
            // Ha a meccs még nem létezik az adatbázisban, hozzáadás
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
        }
    }

    // Felhasználók létrehozása
    //await userModel.create();
    console.log("Users created");
};

module.exports = populateMatches;

