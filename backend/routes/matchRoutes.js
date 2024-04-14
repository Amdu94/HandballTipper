import express from 'express';
const router = express.Router();
import matchController from "../controllers/matchController.js"


router.get("/", matchController.getAllMatches);
router.get("/next", matchController.getNextMatches);
router.get("/:id", matchController.getMatchById);
router.get("/:id/guesses", matchController.getGuessesForMatchById)

export default router;
