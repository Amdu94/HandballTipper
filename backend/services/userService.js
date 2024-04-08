const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUsers(orderBy = { username: 'asc' }) {
    try {
        return await prisma.users.findMany({ orderBy });
    } catch (error) {
        handlePrismaError('Error fetching users:', error);
    }
}

async function getUser(id) {
    try {
        return await prisma.users.findUnique({
            where: { id },
        });
    } catch (error) {
        handlePrismaError('Error fetching user:', error);
    }
}

async function createUser(userData) {
    try {
        const { username, email, password } = userData;
        const guesses = await prisma.matches.findMany({}).then((matches) =>
            matches.map((match) => ({
                match: match.id,
                homeScore: null,
                awayScore: null,
                points: 0,
            }))
        );
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

async function updateUserGuess(userId, guessId, guessData) {
    try {
        await updateUserGuessInUser(userId, guessId, guessData);
        await updateUserGuessInMatch(guessId, userId, guessData);
    } catch (error) {
        handlePrismaError('Error updating user guess:', error);
    }
}

async function updateUserGuessInUser(userId, guessId, guessData) {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }

    const guessIndex = user.guesses.findIndex((guess) => guess.match === guessId);
    if (guessIndex === -1) {
        throw new Error("Guess not found");
    }

    user.guesses[guessIndex] = { ...user.guesses[guessIndex], ...guessData };

    await prisma.users.update({
        where: { id: userId },
        data: { guesses: user.guesses },
    });
}

async function updateUserGuessInMatch(guessId, userId, guessData) {
    const match = await prisma.matches.findUnique({ where: { id: guessId } });
    if (!match) {
        throw new Error("Match not found");
    }

    const existingGuessIndex = match.guesses.findIndex((guess) => guess.user === userId);

    const updatedGuess = { ...guessData, user: userId, points: 0 };
    if (existingGuessIndex !== -1) {
        match.guesses[existingGuessIndex] = updatedGuess;
    } else {
        match.guesses.push(updatedGuess);
    }

    await prisma.matches.update({
        where: { id: guessId },
        data: { guesses: match.guesses },
    });
}

function handlePrismaError(message, error) {
    console.error(message, error);
    throw error;
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUserGuess,
};





