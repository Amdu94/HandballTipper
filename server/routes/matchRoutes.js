const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.get("/next", matchController.getNextMatches);

module.exports = router;
