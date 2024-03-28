const { pointsCalculator } = require("../../services/pointsCalculator");

const updateExistingMatch = async (existingMatch, newMatch) => {
    if (existingMatch.homeScore !== newMatch.scores.home || existingMatch.awayScore !== newMatch.scores.away) {
        existingMatch.homeScore = newMatch.scores.home;
        existingMatch.awayScore = newMatch.scores.away;
        await existingMatch.save();
        console.log(`Match result updated for ${existingMatch.home} vs ${existingMatch.away}`);
        await pointsCalculator(existingMatch._id);
    }
};

module.exports = { updateExistingMatch };
