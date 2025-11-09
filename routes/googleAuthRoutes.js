import express from "express";
import { googleSignup } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/signup", googleSignup);

export default router;
