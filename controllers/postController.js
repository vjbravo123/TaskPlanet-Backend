import { Post } from "../models/Post.js";


export const createPost = async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const post = new Post({
      text,
      image: req.file ? req.file.path : null, // ✅ Cloudinary / Upload URL
      user: userId, // ✅ Save user reference
    });

    await post.save();

    // ✅ Fetch all posts after inserting the new one
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name picture "); // ✅ populate user details (optional)

    return res.json({
      message: "Post created",
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name picture email")
      .populate("comments.user", "name picture")  // ✅ add this
      .sort({ createdAt: -1 });

    return res.json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error retrieving posts" });
  }
}

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { userId } = req.body;

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter(id => id !== userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  res.json({ likes: post.likes });
}

export const commentOnPost = async (req, res) => {
  const { userId, text } = req.body;

  const post = await Post.findById(req.params.id).populate("comments.user");

  post.comments.push({
    user: userId,
    text,
    createdAt: new Date(),
  });

  await post.save();
  await post.populate("comments.user");

  res.json({ comments: post.comments });
}