import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'ml_default'
    });
    console.log('Cloudinary upload success:', uploadResponse);
    return uploadResponse;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

const upload = multer({ storage });

export { upload, imageUploadUtil };