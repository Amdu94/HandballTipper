const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    tips: [
        {match: Number,
        home: Number,
        away: Number,}
    ]
})

module.exports = mongoose.model("Users", UserSchema);
