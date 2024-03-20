const mongoose = require("mongoose");

const { Schema } = mongoose;

const MatchSchema = new Schema({
    home: String,
    away: String,
    date: Date,
    homeScore: Number,
    awayScore: Number,
    homeGuess: Number,
    awayGuess: Number,
});

module.exports = mongoose.model("Matches", MatchSchema);
