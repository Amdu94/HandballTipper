const UserModel = require("../db/user.model");
const userService = require("../services/userService");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.getUserGuesses = async (req, res, next) => {
    try {
        const guesses = await userService.getUserGuesses(req.params.id);
        res.json(guesses);
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateUserGuess = async (req, res, next) => {
    try {
        await userService.updateUserGuess(req.params.userId, req.params.guessId, req.body);
        res.json({ message: "Guess updated successfully" });
    } catch (err) {
        next(err);
    }
};
