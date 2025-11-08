import { commentOnPost, createPost, fetchPosts, likePost } from "../controllers/postController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();
import express from "express";


// ✅ Create post
router.post("/", upload.single("image"), createPost );

// ✅ Get all posts
router.get("/", fetchPosts );

// ✅ Like post
router.post("/:id/like", likePost);

// ✅ Comment on post
router.post("/:id/comment", commentOnPost);


export default router;
