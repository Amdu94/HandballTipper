const mongoose = require("mongoose");

const { Schema } = mongoose;

const TableSchema = new Schema({
    user: String,
    points: Number,
})

module.exports = mongoose.model("Table", TableSchema);
