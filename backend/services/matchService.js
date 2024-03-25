const MatchModel = require("../db/models/match.model");

const getAllMatches = () => {
    return MatchModel.find().sort({ date: "asc" });
};

const getMatchById = (id) => {
    return MatchModel.findById(id);
};

const getNextMatches = () => {
    const date = new Date();
    return MatchModel.find({ date: { $gt: date }}).sort({ date: "asc" });
};

module.exports = {
    getAllMatches,
    getNextMatches,
    getMatchById
};

