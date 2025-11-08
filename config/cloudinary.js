import {CloudinaryStorage} from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "social_media_posts", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const upload = multer({ storage });


export default cloudinary;
