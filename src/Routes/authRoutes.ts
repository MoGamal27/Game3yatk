import { signUp, login } from "../Controllers/authController";
import express from "express";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;