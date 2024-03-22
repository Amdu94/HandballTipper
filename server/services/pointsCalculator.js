// pointsCalculator.js

const MatchModel = require("../db/models/match.model");
const UserModel = require("../db/models/user.model");

const pointsCalculator = async (matchId) => {
    const match = await MatchModel.findById(matchId);
    if (!match) {
        throw new Error("Match not found");
    }

    const correctHomeScore = match.homeScore;
    const correctAwayScore = match.awayScore;

    for (const guess of match.guesses) {
        const user = await UserModel.findById(guess.user);

        if (guess.homeScore === correctHomeScore && guess.awayScore === correctAwayScore) {
            guess.points = 5;
        } else if (guess.homeScore - guess.awayScore === correctHomeScore - correctAwayScore){
            guess.points = 3
        } else if ((guess.homeScore > guess.awayScore && correctHomeScore > correctAwayScore) ||
                    (guess.homeScore < guess.awayScore && correctHomeScore < correctAwayScore) ||
                    (guess.homeScore === guess.awayScore && correctHomeScore === correctAwayScore)){
            guess.points = 1;
        }
        else {
            guess.points = 0;
        }

        await match.save();

        if (!user) {
            throw new Error("User not found");
        } else {
            const userGuessIndex = user.guesses.findIndex(userGuess => userGuess.match.toString() === matchId);
            if (userGuessIndex !== -1) {
                user.guesses[userGuessIndex].points = guess.points;
                await user.save();
            }
        }
    }
};

module.exports = {
    pointsCalculator
};
