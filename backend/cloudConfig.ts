import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

interface CustomParams {
  folder: string;
  allowedFormats: string[];
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "farmersWorld_DEV",
    allowedFormats: ["png", "jpg", "jpeg"],
  } as CustomParams,
});
