import imageKit from "../configs/imageKit.js";
import User from "../models/User.js";
import ListedCar from "../models/listedCar.js";
import fs from 'fs';

// Change role to owner
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, { role: 'owner' });
        res.json({ success: true, message: "Owner successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in changing role to owner" });
    }
}

// List Car
export const listCar = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file); // debugging

    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageFile = req.file;

    console.log("FILE RECEIVED BY MULTER:", req.file);


    // 1. Upload to ImageKit
    const uploadResponse = await imageKit.files.upload({
      file: imageFile.buffer,               // from multer memoryStorage
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    console.log("ImageKit uploaded:", uploadResponse.fileId);

    // 2. Optimized URL
    const optimizedImageURL = imageKit.url({
      path: uploadResponse.filePath,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        {
          width: 1280,
          quality: "auto",
          format: "webp",
        },
      ],
    });

    // 3. Add new listing
    await ListedCar.create({
      ...car,
      image: optimizedImageURL,
      owner: _id,
    });

    res.json({
      success: true,
      message: "Car listed successfully",
    })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in listing car" });
    }
}