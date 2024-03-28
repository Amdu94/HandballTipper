require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}


app.use(express.json());

app.use("/api/matches", matchRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

