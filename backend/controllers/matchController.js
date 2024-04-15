import matchService from "../services/matchService.js";

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
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }
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
};

const getNextMatches = async (req, res, next) => {
    try {
        const matches = await matchService.getNextMatches();
        res.json(matches);
    } catch (err) {
        next(err);
    }
};

const matchController = {
    getAllMatches,
    getNextMatches,
    getMatchById,
    getGuessesForMatchById
};

export default matchController;

