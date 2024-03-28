// user.model.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const GuessSchema = new Schema({
    match: String,
    home: Number,
    away: Number,
    points: { type: Number, default: 0 }
});

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    points: { type: Number, default: 0 },
    guesses: [GuessSchema]
});

module.exports = mongoose.model("User", UserSchema);
