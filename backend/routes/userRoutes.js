import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js"


router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/:id/guesses", userController.getUserGuesses);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser); // Bejelentkezési útvonal
router.patch("/:userId/guesses/:guessId", userController.updateUserGuess);

export default router;
