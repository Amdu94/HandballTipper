import { PrismaClient } from '@prisma/client';
import games from './games.json' assert { type: 'json' };
import { pointsCalculator } from "../../services/pointsCalculator.js";
import matchApi from "../api/pinnacleApi.js";

const prisma = new PrismaClient();

async function populateMatches() {
    const users = await prisma.users.findMany({});
    const fetchedMatches = await matchApi();
    const existingMatches = await prisma.matches.findMany({});

    if (fetchedMatches) {
        for (const newMatch of fetchedMatches) {
            const existingMatch = existingMatches.find(match =>
                match.home === newMatch.teams.home.name && // Updated to access new structure
                match.away === newMatch.teams.away.name // Updated to access new structure
            );

            if (existingMatch) {
                await updateExistingMatch(existingMatch, newMatch);
            } else {
                await addNewMatch(newMatch, users);
            }
        }
    }
}

async function updateExistingMatch(existingMatch, newMatch) {
    // Updated to access new structure for scores and date
    if (existingMatch.homeScore !== newMatch.scores.home ||
        existingMatch.awayScore !== newMatch.scores.away ||
        existingMatch.date.getTime() !== new Date(newMatch.date).getTime()) {
        
        existingMatch.homeScore = newMatch.scores.home;
        existingMatch.awayScore = newMatch.scores.away;
        existingMatch.date = new Date(newMatch.date);
        
        await prisma.matches.update({
            where: { id: existingMatch.id },
            data: {
                homeScore: existingMatch.homeScore,
                awayScore: existingMatch.awayScore,
                date: existingMatch.date
            }
        });
        console.log(`Match result updated for ${existingMatch.home} vs ${existingMatch.away}`);
        await pointsCalculator(existingMatch.id);
    }
}

async function addNewMatch(newMatch, users) {
    const newMatchDb = await prisma.matches.create({
        data: {
            home: newMatch.teams.home.name, // Updated to access new structure
            away: newMatch.teams.away.name, // Updated to access new structure
            date: new Date(newMatch.date), // Updated to access new structure
            homeScore: newMatch.scores.home, // Updated to access new structure
            awayScore: newMatch.scores.away, // Updated to access new structure
            guesses: []
        }
    });

    console.log(`New match added: ${newMatch.teams.home.name} vs ${newMatch.teams.away.name}`);

    for (const user of users) {
        user.guesses.push({
            match: newMatchDb.id,
            home: null,
            away: null
        });
        //await user.save(); // Adatbázis-függő mentési logika
    }
}

export default populateMatches;


