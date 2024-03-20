require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MatchModel = require("./db/match.model");

const { MONGO_URL, PORT = 8080 } = process.env;

const date = new Date();

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/allMatches/", async (req, res) => {
    const matches = await MatchModel.find().sort({ date: "asc" });
    return res.json(matches);
})
app.get("/api/allMatches/:id", async (req, res) => {
    const match = await MatchModel.findById(req.params.id);
    return res.json(match);
})

app.get("/api/nextMatches/", async (req, res) => {
    const matches = await MatchModel.find({ date: { $gt: date }}).sort({ date: "asc" });
    return res.json(matches);
})

app.patch("/api/allMatches/:id", async (req, res, next) => {
    try {
        const match = await MatchModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );
        return res.json(match);
    } catch (err) {
        return next(err);
    }
});


const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log("App is listening on 8080");
        console.log("Try /api/matches route right now");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
