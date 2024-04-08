const { PrismaClient } = require('@prisma/client');
//const matchApi = require("../api/matchApi");
const games = require("./games.json");
const { pointsCalculator } = require("../../services/pointsCalculator");

const prisma = new PrismaClient();

async function populateMatches() {

    //const fetchedMatches = await matchApi();
    const existingMatches = await prisma.matches.findMany({});
    const users = await prisma.users.findMany({});

    for (const newMatch of games.response) {
        const existingMatch = existingMatches.find(match =>
            match.home === newMatch.teams.home.name &&
            match.away === newMatch.teams.away.name &&
            match.date.getTime() === new Date(newMatch.date).getTime()
        );

        if (existingMatch) {
            await updateExistingMatch(existingMatch, newMatch);
        } else {
            await addNewMatch(newMatch, users);
        }
    }
}

async function updateExistingMatch(existingMatch, newMatch) {
    if (existingMatch.homeScore !== newMatch.scores.home || existingMatch.awayScore !== newMatch.scores.away) {
        existingMatch.homeScore = newMatch.scores.home;
        existingMatch.awayScore = newMatch.scores.away;
        await prisma.matches.update({
            where: { id: existingMatch.id },
            data: {
                homeScore: existingMatch.homeScore,
                awayScore: existingMatch.awayScore
            }
        });
        console.log(`Match result updated for ${existingMatch.home} vs ${existingMatch.away}`);
        await pointsCalculator(existingMatch.id);
    }
}

async function addNewMatch(newMatch, users) {
    const newMatchDb = await prisma.matches.create({
        data: {
            home: newMatch.teams.home.name,
            away: newMatch.teams.away.name,
            date: newMatch.date,
            homeScore: newMatch.scores.home,
            awayScore: newMatch.scores.away,
            guesses: []
        }
    });

    console.log(`New match added: ${newMatch.home} vs ${newMatch.away}`);

    for (const user of users) {
        user.guesses.push({
            match: newMatchDb.id,
            home: null,
            away: null
        });
        await user.save();
    }
}

module.exports = populateMatches;

