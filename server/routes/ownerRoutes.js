import express from 'express';
import { changeRoleToOwner, listCar } from '../controllers/ownerController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/list-car', upload.single("image"), protect, listCar);

export default ownerRouter;