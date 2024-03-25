const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.get("/next", matchController.getNextMatches);
router.get("/:id/guesses", matchController.getGuessesForMatchById)

module.exports = router;
