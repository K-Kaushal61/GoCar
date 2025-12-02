// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";
// import 'dotenv/config'

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath)=> {

//     try {
//         if(!localFilePath) return res.json({ success: false, message: "local file path not found" });
//         // upload on cloudinary
//         const response = await cloudinary.uploader
//         .upload(localFilePath, {
//             resource_type: "auto",
//         })
//         //file uploaded
//         console.log("file uploaded on cloudinary", response.url);
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) //remove locally saved temporary file
//         return null
//     }

// }

// export { uploadOnCloudinary }


import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload buffer instead of file path
export const uploadBufferToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};
