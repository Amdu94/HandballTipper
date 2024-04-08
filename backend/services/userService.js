const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllUsers() {
    try {
        return await prisma.users.findMany({
            orderBy: { username: 'asc' },
        });
    } catch (error) {
        handlePrismaError('Error fetching users:', error);
    }
}

async function getUserById(id) {
    try {
        return await prisma.users.findUnique({
            where: { id },
        });
    } catch (error) {
        handlePrismaError('Error fetching user by ID:', error);
    }
}

async function getUserGuesses(id) {
    try {
        const user = await prisma.users.findUnique({
            where: { id }
        });
        return user.guesses;
    } catch (error) {
        handlePrismaError('Error fetching user guesses:', error);
    }
}

async function createUser(userData) {
    try {
        const { username, email, password } = userData;
        const matches = await prisma.matches.findMany({});
        const guesses = matches.map(match => ({
            match: match.id,
            home: null,
            away: null,
            points: 0,
        }));
        return await prisma.users.create({
            data: {
                username,
                email,
                password,
                guesses,
                points: 0,
            },
        });
    } catch (error) {
        handlePrismaError('Error creating user:', error);
    }
}

async function updateUserGuess(userId, guessId, { home, away }) {
    try {
        const user = await prisma.users.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const guessIndex = user.guesses.findIndex(guess => guess.match === guessId);
        if (guessIndex === -1) {
            throw new Error("Guess not found");
        }
        user.guesses[guessIndex].home = home;
        user.guesses[guessIndex].away = away;
        await prisma.users.update({
            where: { id: userId },
            data: { guesses: user.guesses }
        });
        const matchId = user.guesses[guessIndex].match;
        const match = await prisma.matches.findUnique({
            where: { id: guessId }
        });
        if (!match) {
            throw new Error("Match not found");
        }
        const existingGuessIndex = match.guesses.findIndex(guess => guess.user === userId);
        if (existingGuessIndex !== -1) {
            match.guesses[existingGuessIndex].homeScore = home;
            match.guesses[existingGuessIndex].awayScore = away;
            await prisma.matches.update({
                where: {
                    id: matchId,
                },
                data: { guesses: match.guesses }
            });
        } else {
            await prisma.matches.update({
                where: { id: matchId },
                data: {
                    guesses: {
                        push: [{
                            user: userId,
                            homeScore: home,
                            awayScore: away,
                            points: 0
                        }]
                    },
                },
            });
        }
    } catch (error) {
        handlePrismaError('Error updating user guess:', error);
    }
}

function handlePrismaError(message, error) {
    console.error(message, error);
    throw error;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserGuesses,
    createUser,
    updateUserGuess
};




