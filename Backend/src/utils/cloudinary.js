import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const stats = fs.statSync(localFilePath)
        const fileSizeMB = stats.size / (1024 * 1024)

        console.log("Uploading:", localFilePath)
        console.log("Size:", fileSizeMB.toFixed(2), "MB")

        if (fileSizeMB > 100) {
            fs.unlinkSync(localFilePath)
            throw new Error("Video exceeds Cloudinary free plan limit (100 MB)")
        }

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        )

        fs.unlinkSync(localFilePath)

        return response

    } catch (error) {
        console.log("Cloudinary Error:", error.message)

        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath)
        }

        return null
    }
}


export {uploadOnCloudinary}