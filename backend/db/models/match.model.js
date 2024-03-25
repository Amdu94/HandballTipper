// match.model.js
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
            points: { type: Number, default: 0 } // Új mező: pontok
        }
    ]
});

module.exports = mongoose.model("Match", MatchSchema);
