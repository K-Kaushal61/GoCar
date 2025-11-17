import React, { useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <TitleOwner
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      {/* Upload Section */}
      <div className="mt-10 flex items-center gap-5">
        <label
          htmlFor="car-image"
          className="flex flex-col items-center justify-center gap-2 w-40 h-32 border border-borderColor cursor-pointer rounded-md bg-primary/5 hover:bg-primary/10 transition"
        >
          {image ? (
            <img
              src={image}
              alt="car"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <>
              <img src={assets.upload_icon} alt="" className="w-6 opacity-70" />
              <p className="text-xs text-gray-500">Upload</p>
            </>
          )}
        </label>
        <input
          type="file"
          id="car-image"
          className="hidden"
          onChange={handleImageUpload}
        />
        <p className="text-sm text-gray-500 mt-2">
          Upload a picture of your car
        </p>
      </div>

      {/* Form Fields */}
      <form className="mt-10 flex flex-col gap-6 max-w-3xl">

        {/* Brand / Model */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>
        </div>

        {/* Year / Price / Category */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-500">Year</label>
            <input
              type="number"
              placeholder="2025"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Daily Price (₹)
            </label>
            <input
              type="number"
              placeholder="100"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Category</label>
            <input
              type="text"
              placeholder="Sedan"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>
        </div>

        {/* Transmission / Fuel / Seating */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-500">Transmission</label>
            <input
              type="text"
              placeholder="Automatic"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Fuel Type</label>
            <input
              type="text"
              placeholder="Diesel"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Seating Capacity</label>
            <input
              type="number"
              placeholder="5"
              className="w-full p-3 border border-borderColor rounded-md"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-gray-500">Location</label>
          <input
            type="text"
            placeholder="e.g. New Delhi, Mumbai, Bangalore..."
            className="w-full p-3 border border-borderColor rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-500">Description</label>
          <textarea
            placeholder="Describe your car, its condition, and any notable details..."
            rows={5}
            className="w-full p-3 border border-borderColor rounded-md"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-md w-fit mt-4 flex items-center gap-2 mb-5"
        >
          ✓ List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
