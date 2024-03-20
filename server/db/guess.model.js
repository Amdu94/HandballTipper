const mongoose = require("mongoose");

const { Schema } = mongoose;

const GuessSchema = new Schema({
    match: String,
    guesses: [
        {
            name: String,
            homeScore: Number,
            awayScore: Number,
        }
    ]
})

module.exports = mongoose.model("Guesses", GuessSchema);
