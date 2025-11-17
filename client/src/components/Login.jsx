import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = ({ mode = "login", setMode, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = () => {
    if (onSubmit) {
      if (isSignup) {
        onSubmit({ fullName, email, password });
      } else {
        onSubmit({ email, password });
      }
    }
    onClose && onClose();
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-xl shadow-md w-full max-w-md text-center relative">

      {/* Close Button */}
      <button className="absolute top-4 right-4" onClick={onClose}>
        <img src={assets.close_icon} className="w-4" alt="close" />
      </button>

      {/* Heading */}
      <h2 className="text-xl font-semibold text-primary mb-6">
        {isSignup ? "Create Account" : "Login"}
      </h2>


      {/* Full Name (Signup Only) */}
      {isSignup && (
        <div className="text-left mb-4">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-borderColor rounded-md mt-1"
          />
        </div>
      )}

      {/* Email */}
      <div className="text-left mb-4">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-borderColor rounded-md mt-1"
        />
      </div>

      {/* Password */}
      <div className="text-left mb-6">
        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-borderColor rounded-md mt-1"
        />
      </div>

      {/* Switch */}
      <p className="text-sm text-gray-500 mb-4">
        {isSignup ? "Already have an account?" : "Create an account?"}{" "}
        <span
          className="text-primary underline cursor-pointer"
          onClick={() => setMode(isSignup ? "login" : "signup")}
        >
          {isSignup ? "Login here" : "Signup here"}
        </span>
      </p>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        className="bg-primary text-white w-full py-3 rounded-md font-medium"
      >
        {isSignup ? "Signup" : "Login"}
      </button>

    </div>
  );
};

export default Login;
