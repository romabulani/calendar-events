import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthHandler } from "../hooks";

export const SignupPage: React.FC = () => {
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const { authHandler } = useAuthHandler();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Sign Up</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2 text-left">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-md border"
            placeholder="Enter your email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 text-left"
          >
            Password *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 rounded-md border"
              placeholder="Enter your password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="absolute top-3 right-2 text-sm text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          onClick={(e) =>
            authHandler({
              e: e,
              setData: setSignupData,
              data: signupData,
              isSignup: true,
            })
          }
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Sign Up
        </button>
        <div className="text-gray-700 text-sm pt-2">
          <span>Already have an account?</span>
          <Link to="/login" className="font-bold pl-2 underline" replace>
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};
