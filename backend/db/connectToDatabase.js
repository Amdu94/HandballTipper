import PrismaClient from "@prisma/client"

const prisma = new PrismaClient();

const connectToDatabase = async (mongoUrl) => {
    try {
        await prisma.$connect(mongoUrl);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
