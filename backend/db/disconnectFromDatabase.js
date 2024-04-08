const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const disconnectFromDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from database");
    } catch (error) {
        console.error("Error disconnecting from database:", error);
        process.exit(1);
    }
};

module.exports = disconnectFromDatabase;
