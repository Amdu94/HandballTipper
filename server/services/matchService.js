const MatchModel = require("../db/match.model");

exports.getAllMatches = () => {
    return MatchModel.find().sort({ date: "asc" });
};

exports.getMatchById = (id) => {
    return MatchModel.findById(id);
};

exports.getNextMatches = () => {
    const date = new Date();
    return MatchModel.find({ date: { $gt: date }}).sort({ date: "asc" });
};

