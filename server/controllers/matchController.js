const MatchModel = require("../db/match.model");
const matchService = require("../services/matchService");

exports.getAllMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getAllMatches();
        res.json(matches);
    } catch (err) {
        next(err);
    }
};

exports.getMatchById = async (req, res, next) => {
    try {
        const match = await matchService.getMatchById(req.params.id);
        res.json(match);
    } catch (err) {
        next(err);
    }
};

exports.getNextMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getNextMatches();
        res.json(matches);
    } catch (err) {
        next(err);
    }
};
