const MatchModel = require("../db/models/match.model");
const UserModel = require("../db/models/user.model");

const calculatePoints = (guess, actual) => {
    const correctResult = (guess.homeScore === actual.homeScore) && (guess.awayScore === actual.awayScore);
    const correctGoalDifference = guess.homeScore - guess.awayScore === actual.homeScore - actual.awayScore;
    const guessedWinner = guess.homeScore - guess.awayScore === actual.homeScore - actual.awayScore;

    if (correctResult) {
        return 5;
    } else if (correctGoalDifference) {
        return 3;
    } else if (guessedWinner) {
        return 1;
    } else {
        return 0;
    }
};


const pointsCalculator = async (matchId) => {
    // Fetch match and throw error if not found
    const match = await MatchModel.findById(matchId);
    if (!match) {
        throw new Error("Match not found");
    }

    const { homeScore, awayScore, guesses } = match; // Destructuring for cleaner access

    for (const guess of guesses) {
        const user = await UserModel.findById(guess.user);

        if (!user) {
            throw new Error("User not found");
        }

        guess.points = calculatePoints(guess, { homeScore, awayScore });

        await match.save();

        const userGuessIndex = user.guesses.findIndex((userGuess) => userGuess.match.toString() === matchId);
        if (userGuessIndex !== -1) {
            user.guesses[userGuessIndex].points = guess.points;
            await user.save();
        }
    }
};

module.exports = {
    pointsCalculator,
};


