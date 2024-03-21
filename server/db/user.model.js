const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    guesses: [
        {match: String,
        home: Number,
        away: Number,}
    ]
})

module.exports = mongoose.model("Users", UserSchema);
