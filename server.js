import emailAuthRoutes from "./routes/emailAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postsRoutes from "./routes/postRoutes.js"
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDB();

const url = process.env.FRONTEND_URL;
console.log(url);

const app = express();

app.use(
  cors({
    origin: url, 
    credentials: true,              
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", emailAuthRoutes);

app.use("/api/users", userRoutes);

app.use('/api/posts/', postsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
