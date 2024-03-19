require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MatchModel = require("./db/match.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express();
app.use(express.json());


const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log("App is listening on 8080");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});