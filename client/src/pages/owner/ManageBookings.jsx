import React from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets, dummyMyBookingsData } from "../../assets/assets";

const ManageBookings = () => {
  const bookings = dummyMyBookingsData; // Replace with API later

  // Robust parser for booking date strings.
  // Handles:
  //  - ISO strings ("2025-06-10T12:57:48.244Z")
  //  - DD-MM-YYYYT... (e.g. "13-06-2025T00:00:00.000Z")
  //  - plain date strings or Date objects
  const parseBookingDate = (dateInput) => {
    if (!dateInput) return null;

    // If already a Date instance
    if (dateInput instanceof Date) return dateInput;

    // If it's numeric timestamp
    if (typeof dateInput === "number") return new Date(dateInput);

    // Try native parse first (works for standard ISO)
    const tryNative = new Date(dateInput);
    if (!isNaN(tryNative.getTime())) return tryNative;

    // If native parse failed, try to detect DD-MM-YYYY or DD/MM/YYYY before 'T'
    // Example: "13-06-2025T00:00:00.000Z" or "13/06/2025"
    const dateOnly = String(dateInput).split("T")[0];
    const sep = dateOnly.includes("-") ? "-" : dateOnly.includes("/") ? "/" : null;

    if (sep) {
      const parts = dateOnly.split(sep).map((p) => p.trim());
      // If looks like DD-MM-YYYY (day length 2, year length 4)
      if (parts.length >= 3) {
        // assume format is DD-MM-YYYY or DD/MM/YYYY
        const [d, m, y] = parts;
        // create ISO formatted date string "YYYY-MM-DD" and append time part if present
        const timePart = String(dateInput).includes("T") ? "T" + String(dateInput).split("T")[1] : "";
        const iso = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}${timePart}`;
        const dt = new Date(iso);
        if (!isNaN(dt.getTime())) return dt;
      }
    }

    // As a last resort try to replace '-' with '/' and parse (some browsers parse dd/mm/yyyy)
    const swapped = String(dateInput).replace(/-/g, "/");
    const finalTry = new Date(swapped);
    if (!isNaN(finalTry.getTime())) return finalTry;

    // If everything fails return null
    return null;
  };

  // Format date for UI (M/D/YYYY). Returns empty string if invalid.
  const formatDate = (dateStr) => {
  const d = parseBookingDate(dateStr);
  if (!d) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};


  // Status Colors
  const statusColors = {
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
    available: "bg-green-100 text-green-700",
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <TitleOwner
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      {/* Table */}
      <div className="mt-8 w-full border border-borderColor rounded-md overflow-hidden">
        {/* Header */}
        <div
          className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] bg-gray-50 py-3 px-4
                        text-sm font-medium text-gray-600 border-b border-borderColor"
        >
          <p>Car</p>
          <p>Date Range</p>
          <p>Total</p>
          <p>Status</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Rows */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] items-center py-5 px-4
                       border-b border-borderColor last:border-b-0"
          >
            {/* Car Info */}
            <div className="flex items-center gap-4">
              <img
                src={booking.car.image}
                alt="car"
                className="w-16 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-medium">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-gray-500 text-sm">
                  {booking.car.seating_capacity} seats • {booking.car.transmission}
                </p>
              </div>
            </div>

            {/* Date Range */}
            <p className="text-gray-700">
              {formatDate(booking.pickupDate)} To {formatDate(booking.returnDate)}
            </p>

            {/* Price */}
            <p className="font-medium">₹{booking.price}</p>

            {/* Status */}
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[booking.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center">
              <select className="border border-borderColor text-sm px-3 py-1 rounded-md bg-white">
                <option>Cancel</option>
                <option>Confirm</option>
                <option>Complete</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
