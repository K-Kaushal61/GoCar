import React from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets, dummyCarData } from "../../assets/assets";

const ManageCars = () => {
  const cars = dummyCarData;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <TitleOwner
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform"
      />

      {/* Table */}
      <div className="mt-8 w-full border border-borderColor rounded-md overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] bg-gray-50 py-3 px-4 
                        text-sm font-medium text-gray-600 border-b border-borderColor">
          <p>Car</p>
          <p>Category</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Rows */}
        {cars.map((car) => (
          <div
            key={car._id}
            className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] items-center py-5 px-4
                       border-b border-borderColor last:border-b-0"
          >
            {/* Car Info */}
            <div className="flex items-center gap-4">
              <img
                src={car.image}
                alt={car.brand}
                className="w-16 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{car.brand} {car.model}</p>
                <p className="text-gray-500 text-sm">
                  {car.seating_capacity} seats • {car.transmission}
                </p>
              </div>
            </div>

            {/* Category */}
            <p className="text-gray-700">{car.category}</p>

            {/* Price */}
            <p className="font-medium">₹{car.pricePerDay}/day</p>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${car.isAvaliable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {car.isAvaliable ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 justify-center">
              {/* View Button Bigger */}
              <button className="hover:opacity-100 opacity-80 transition">
                <img src={assets.eye_icon} className="w-10 h-10" alt="view" />
              </button>

              {/* Delete Button Bigger */}
              <button className="hover:opacity-100 opacity-80 transition">
                <img src={assets.delete_icon} className="w-10 h-10" alt="delete" />
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ManageCars;
