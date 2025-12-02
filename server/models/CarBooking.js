import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const carBookingSchema = new mongoose.Schema({
    car: {
        type: ObjectId,
        ref: 'ListedCar',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: Date,
        enum: [
            "pending",
            "confirmed", 
            "cancelled"
        ],
        default: "pending"
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const CarBooking = mongoose.model('CarBooking', carBookingSchema);

export default CarBooking;