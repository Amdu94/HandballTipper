import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllMatches = async() => {
    try {
        return await prisma.matches.findMany({
            orderBy: { date: 'asc' },
        });
    } catch (error) {
        handleError('Error fetching all matches:', error);
    }
}

const getMatchById = async(id) => {
    try {
        return await prisma.matches.findUnique({
            where: { id },
        });
    } catch (error) {
        handleError('Error fetching match by ID:', error);
    }
}

const getNextMatches = async() => {
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

const matchService = {
    getAllMatches,
    getNextMatches,
    getMatchById,
}
export default matchService;

