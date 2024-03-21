require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MatchModel = require("./db/match.model");
const GuessModel = require("./db/guess.model");
const UserModel = require("./db/user.model");

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

app.get("/api/users/", async (req, res) => {
    const users = await UserModel.find().sort({ date: "asc" });
    return res.json(users);
})

app.get("/api/users/:id", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    return res.json(user);
})

app.get("/api/users/:id/guesses", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    return res.json(user.guesses);
})


app.post("/api/users/", async (req, res, next) => {
    const user = req.body;

    try {
        const saved = await UserModel.create(user);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
})

app.patch("/api/users/:userId/guesses", async (req, res, next) => {
    const { userId } = req.params;
    const { matchId, home, away } = req.body;

    try {
        // Felhasználó betöltése az azonosító alapján
        const user = await UserModel.findById(userId);
        const userGuesses = user.guesses;

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }

        // Meglévő tipp keresése a meccsre
        const existingGuess = userGuesses.find((guess) => guess.match === matchId);

        // Ha létezik tipp, frissítjük, ha nem, újat hozunk létre
        if (existingGuess) {
            existingGuess.home = home;
            existingGuess.away = away;
        } else {
            userGuesses.push({ match: matchId, home, away });
        }

        // Felhasználó tippjeinek mentése
        await user.save();

        // Megkeressük a meccset és frissítjük a tippeket
        const updatedMatch = await MatchModel.findOneAndUpdate(
            { _id: matchId },
            { $set: { guesses: { user: userId, homeScore: home, awayScore: away } } },
            { new: true }
        );

        if (!updatedMatch) {
            return res.status(404).json({ message: "Meccs nem található" });
        }

        return res.json(user);
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
