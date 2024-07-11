import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("Local file path is undefined or null");
            return null;
        }

        console.log("Uploading file:", localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded successfully:", response.url);
        return response;
    } catch (error) {
        console.log("Error during upload:", error);

        try {
            fs.unlinkSync(localFilePath);
            console.log("Deleted local file:", localFilePath);
        } catch (fsError) {
            console.log("Error deleting file:", fsError);
        }

        return null;
    }
};

export { uploadOnCloudinary };
