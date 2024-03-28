const UserModel = require("../db/models/user.model");
const MatchModel = require("../db/models/match.model");

const getAllUsers = async () => {
    return UserModel.find().sort({ date: "asc" });
};

const getUserById = async (id) => {
    return UserModel.findById(id);
};

const getUserGuesses = async (id) => {
    const user = await UserModel.findById(id);
    return user.guesses;
};

const createUser = async (userData) => {
    const { username, email, password } = userData;
    const user = await UserModel.create({ username, email, password });
    await initializeUserGuesses(user);
    return user;
};

const updateUserGuess = async (userId, guessId, { home, away }) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    const guessIndex = user.guesses.findIndex(guess => guess._id.equals(guessId));
    if (guessIndex === -1) throw new Error("Guess not found");

    user.guesses[guessIndex].home = home;
    user.guesses[guessIndex].away = away;
    await user.save();

    await updateMatchGuess(user, userId, guessId, { home, away });
};

const initializeUserGuesses = async (user) => {
    const matches = await MatchModel.find({}, '_id');
    const userGuesses = matches.map(match => ({ match: match._id, home: null, away: null, points: 0 }));
    user.guesses = userGuesses;
    await user.save();
};

const updateMatchGuess = async (user, userId, guessId, { home, away }) => {
    const matchId = user.guesses.find(guess => guess._id.equals(guessId)).match;
    const match = await MatchModel.findById(matchId);
    if (!match) throw new Error("Match not found");

    const existingGuessIndex = match.guesses.findIndex(guess => guess.user && guess.user.toString() === userId);
    if (existingGuessIndex !== -1) {
        match.guesses[existingGuessIndex].homeScore = home;
        match.guesses[existingGuessIndex].awayScore = away;
    } else {
        match.guesses.push({ user: userId, homeScore: home, awayScore: away });
    }
    await match.save();
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserGuesses,
    createUser,
    updateUserGuess
};
