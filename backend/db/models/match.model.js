// match.model.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const GuessSchema= new Schema({
    user: String,
    homeScore: Number,
    awayScore: Number,
    points: { type: Number, default: 0 }
})

const MatchSchema = new Schema({
    home: String,
    away: String,
    date: Date,
    homeScore: Number,
    awayScore: Number,
    guesses: [GuessSchema]
});

module.exports = mongoose.model("Match", MatchSchema);
