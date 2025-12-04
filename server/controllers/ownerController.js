import CarBooking from "../models/CarBooking.js";
import User from "../models/User.js";
import ListedCar from "../models/listedCar.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

// Change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({
      success: true,
      message: "User role updated to owner",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating role" });
  }
};

//Update User Image
export const updateImage = async (req, res) => {
  try {
    // multer put the file here
    if (!req.file) {
      return res.json({
        success: false,
        message: "No image file provided",
      });
    }

    // upload buffer to Cloudinary
    const result = await uploadBufferToCloudinary(req.file.buffer, "users"); // folder "users"

    // req.user is set by protect middleware
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: result.secure_url }, // save Cloudinary URL
      { new: true }
    ).select("-password"); // optional: hide password

    return res.json({
      success: true,
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateImage:", error);
    return res.json({
      success: false,
      message: "Error while updating image",
    });
  }
};

// List Car (with Cloudinary image upload)
export const listCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Car image is required",
      });
    }

    // Upload image from memory buffer
    const cloudinaryImage = await uploadBufferToCloudinary(req.file.buffer, "cars");

    // Create car listing
    const newCar = await ListedCar.create({
      owner: _id,
      brand: car.brand,
      model: car.model,
      year: car.year,
      category: car.category,
      seating_capacity: car.seating_capacity,
      fuel_type: car.fuel_type,
      transmission: car.transmission,
      pricePerDay: car.pricePerDay,
      location: car.location,
      description: car.description,
      image: cloudinaryImage.secure_url, // Save Cloudinary URL
    });

    res.json({
      success: true,
      message: "Car listed successfully",
      car: newCar,
    });

  } catch (error) {
    console.log("LIST CAR ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to list car",
      error: error.message,
    });
  }
};


export const getOwnerCars = async (req, res)=> {

  try {
    const { _id } = req.user;
    const cars = await ListedCar.find({owner: _id})
    res.json({
      success: true,
      cars
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// API to toggle car availability
export const toggleCarAvailability = async (req, res)=> {

  try {
    const { _id } = req.user;
    const {carId} = req.body;
    const car = await ListedCar.findById(carId)

    // checking owner
    if(car.owner.toString() !== _id.toString()){
      return res.json({success: false, message:"Unauthorized owner", error: error.message})
    }

    car.isAvailable = !car.isAvailable;
    await car.save()

    res.json({success: true, message:"Availability toggled", cars})

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// API to delete a car
export const deleteCar = async (req, res)=> {

  try {
    const { _id } = req.user;
    const {carId} = req.body;
    const car = await ListedCar.find(carId)

    // checking owner
    if(car.owner.toString() !== userId.toString()){
      return res.json({success: false, message:"Unauthorized owner", error: error.message})
    }

    car.owner = null;
    car.isAvailable = false;
    await car.save()

    res.json({success: true, message:"Car removed"})

    res.json({
      success: true,
      cars
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// API to get dashboard data
export const getDashboardData = async (req, res)=> {
  
  try {
     const { _id, role } = req.user;
     if (role != 'owner') {
      return res.json({success: false, message:"Unauthorized, not owner", error: error.message})
     }
     const cars = await ListedCar.find({owner: _id})
     const bookings = await CarBooking.find({owner: _id}).populate("car").sort({createdAt: -1});

     const pendingBookings = await CarBooking.find({owner: _id, status: "pending"})
     const completedBookings = await CarBooking.find({owner: _id, status: "confirmed"})

     // Calculate monthly revenue from bookings where status is confirmed
     const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

     const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0,3),
      monthlyRevenue
     }

     res.json({
      success: true,
      dashboardData
     })

  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });  
  }

}