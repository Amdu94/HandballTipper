const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllMatches() {
    try {
        return await prisma.matches.findMany({
            orderBy: { date: 'asc' },
        });
    } catch (error) {
        handleError('Error fetching all matches:', error);
    }
}

async function getMatchById(id) {
    try {
        return await prisma.matches.findUnique({
            where: { id },
        });
    } catch (error) {
        handleError('Error fetching match by ID:', error);
    }
}

async function getNextMatches() {
    try {
        const today = new Date();
        return await prisma.matches.findMany({
            where: { date: { gt: today } },
            orderBy: { date: 'asc' },
        });
    } catch (error) {
        handleError('Error fetching next matches:', error);
    }
}

function handleError(message, error) {
    console.error(message, error);
    throw error;
}

module.exports = { getAllMatches, getNextMatches, getMatchById };


