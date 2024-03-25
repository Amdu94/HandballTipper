const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/:id/guesses", userController.getUserGuesses);
router.post("/", userController.createUser);
router.patch("/:userId/guesses/:guessId", userController.updateUserGuess);

module.exports = router;
