const mongoose = require("mongoose");

const { Schema } = mongoose;

const MatchSchema = new Schema({
    home: String,
    away: String,
    date: Date,
    homeScore: Number,
    awayScore: Number,
    guesses: [
        {
            user: String,
            homeScore: Number,
            awayScore: Number,
        }
    ]
});

module.exports = mongoose.model("Matches", MatchSchema);
