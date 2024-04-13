import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

function calculatePoints(guess, actual) {
    const correctResult = (guess.homeScore === actual.homeScore) && (guess.awayScore === actual.awayScore);
    const correctGoalDifference = Math.abs(guess.homeScore - guess.awayScore) === Math.abs(actual.homeScore - actual.awayScore);
    const guessedWinner = (guess.homeScore > guess.awayScore && actual.homeScore > actual.awayScore) ||
        (guess.homeScore < guess.awayScore && actual.homeScore < actual.awayScore);

    if (correctResult) {
        return 5;
    } else if (correctGoalDifference) {
        return 3;
    } else if (guessedWinner) {
        return 1;
    } else {
        return 0;
    }
}

async function pointsCalculator(matchId) {
    try {
        const match = await prisma.matches.findUnique({
            where: { id: matchId }
        });

        if (!match) {
            throw new Error('Match not found');
        }

        const { homeScore, awayScore, guesses } = match;

        for (const guess of guesses) {
            const user = await prisma.users.findUnique({
                where: { id: guess.user }
            });

            if (!user) {
                throw new Error('User not found');
            }

            guess.points = calculatePoints(guess, { homeScore, awayScore });

            const guessIndex = match.guesses.findIndex(g => g.id === guess.id);
            if (guessIndex !== -1) {
                match.guesses[guessIndex] = { ...match.guesses[guessIndex], points: guess.points };
            }

            const userGuessIndex = user.guesses.findIndex(userGuess => userGuess.match === matchId);
            if (userGuessIndex !== -1) {
                user.guesses[userGuessIndex] = { ...user.guesses[userGuessIndex], points: guess.points };
                const totalPoints = user.guesses.reduce((sum, current) => sum + current.points, 0);
                await prisma.users.update({ where: { id: user.id }, data: { guesses: user.guesses, points: totalPoints } });
            }
        }

        await prisma.matches.update({
            where: { id: matchId },
            data: { guesses: match.guesses }
        });
    } catch (error) {
        console.error('Error in pointsCalculator:', error);
        throw error;
    }
}

module.exports = { pointsCalculator, calculatePoints };



