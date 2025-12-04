import express from 'express';
import { changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, listCar, toggleCarAvailability, updateImage } from '../controllers/ownerController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/list-car', protect, upload.single("image"), listCar);
ownerRouter.get('/cars', protect, getOwnerCars);
ownerRouter.post('/toggle-availability', protect, toggleCarAvailability);
ownerRouter.post('/delete-car', protect, deleteCar);
ownerRouter.post('/update-image', protect, upload.single("image"), updateImage);
ownerRouter.get('/dashboard', protect, getDashboardData);

export default ownerRouter;