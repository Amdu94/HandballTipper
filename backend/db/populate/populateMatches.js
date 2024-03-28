const matchApi = require("../api/matchApi");
const matchModel = require("../models/match.model");
const userModel = require("../models/user.model");
const { updateOrAddMatch } = require("./matchUtils");

const populateMatches = async () => {
    const fetchedMatches = await matchApi();
    const existingMatches = await matchModel.find();
    const users = await userModel.find();

    for (const newMatch of fetchedMatches.response) {
        await updateOrAddMatch(newMatch, existingMatches, users);
    }

    console.log("Matches population completed");
};

module.exports = populateMatches;
