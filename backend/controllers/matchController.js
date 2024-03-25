const matchService = require("../services/matchService");

const getAllMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getAllMatches();
        res.json(matches);
    } catch (err) {
        next(err);
    }
};

const getMatchById = async (req, res, next) => {
    try {
        const match = await matchService.getMatchById(req.params.id);
        res.json(match);
    } catch (err) {
        next(err);
    }
};

const getGuessesForMatchById = async (req, res, next) => {
    try {
        const match = await matchService.getMatchById(req.params.id);
        res.json(match.guesses);
    } catch (err) {
        next(err);
    }
}

const getNextMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getNextMatches();
        res.json(matches);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllMatches,
    getNextMatches,
    getMatchById,
    getGuessesForMatchById
};
