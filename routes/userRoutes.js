import express from "express";
import { googleSignup } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", googleSignup);

export default router;
