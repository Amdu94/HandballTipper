const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String, // Új mező: e-mail cím
    password: String, // Új mező: jelszó
    guesses: [
        {
            match: String,
            home: Number,
            away: Number
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);
