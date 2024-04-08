const userService = require("../services/userService");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const getUserGuesses = async (req, res, next) => {
    try {
        const guesses = await userService.getUser(req.params.id);
        res.json(guesses.guesses);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const updateUserGuess = async (req, res, next) => {
    try {
        await userService.updateUserGuess(req.params.userId, req.params.guessId, req.body);
        res.json({ message: "Guess updated successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserGuesses,
    createUser,
    updateUserGuess
};
