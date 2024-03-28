const { updateExistingMatch } = require("./updateExistingMatch");
const { addNewMatch } = require("./addNewMatch");

const updateOrAddMatch = async (newMatch, existingMatches, users) => {
    const existingMatch = existingMatches.find(match =>
        match.home === newMatch.teams.home.name &&
        match.away === newMatch.teams.away.name &&
        match.date.getTime() === new Date(newMatch.date).getTime()
    );

    if (existingMatch) {
        await updateExistingMatch(existingMatch, newMatch);
    } else {
        await addNewMatch(newMatch, users);
    }
};

module.exports = { updateOrAddMatch };
