import { PrismaClient } from '@prisma/client'
import games from './games.json' assert { type: 'json' };
import { pointsCalculator } from "../../services/pointsCalculator.js";
//import matchApi from "../api/matchApi.js";
//import sofaSportApi from "../api/sofaSportApi.js";

const prisma = new PrismaClient();

async function populateMatches() {
    const courses = ['last', 'next'];
    const users = await prisma.users.findMany({});

    for (const course of courses) {
        let page = 0;
        let hasMore = true;

        while (hasMore) {
            const fetchedMatches = games;
            const existingMatches = await prisma.matches.findMany({});
            if (fetchedMatches && fetchedMatches.data && fetchedMatches.data.events) {
                for (const newMatch of fetchedMatches.data.events) {
                    const existingMatch = existingMatches.find(match =>
                        match.home === newMatch.homeTeam.name &&
                        match.away === newMatch.awayTeam.name
                    );
                    console.log(existingMatch);
                    if (existingMatch) {
                        await updateExistingMatch(existingMatch, newMatch);
                    } else {
                        await addNewMatch(newMatch, users);
                    }
                }
                page++;
                hasMore = fetchedMatches.data.hasNextPage; // Ellenőrzi, hogy van-e következő oldal
            } else {
                hasMore = false; // Ha nincs több adat, befejezi a ciklust
            }
        }
    }
}


async function updateExistingMatch(existingMatch, newMatch) {
    if (existingMatch.homeScore !== newMatch.homeScore.display ||
        existingMatch.awayScore !== newMatch.awayScore.display ||
        existingMatch.date !== new Date(newMatch.startTimestamp * 1000)) {
        existingMatch.homeScore = newMatch.homeScore.display;
        existingMatch.awayScore = newMatch.awayScore.display;
        existingMatch.date = new Date(newMatch.startTimestamp * 1000);
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
    const timestamp = newMatch.startTimestamp * 1000;
    const newMatchDb = await prisma.matches.create({
        data: {
            home: newMatch.homeTeam.name,
            away: newMatch.awayTeam.name,
            date: new Date(timestamp),
            homeScore: newMatch.homeScore.display,
            awayScore: newMatch.awayScore.display,
            guesses: []
        }
    });

    console.log(`New match added: ${newMatch.homeTeam.name} vs ${newMatch.awayTeam.name}`);

    for (const user of users) {
        user.guesses.push({
            match: newMatchDb.id,
            home: null,
            away: null
        });
        //await user.save();
    }
}

export default populateMatches;

