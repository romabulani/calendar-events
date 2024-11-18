import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthHandler } from "../hooks";

export const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { authHandler } = useAuthHandler();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600  flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
      <form
        onSubmit={(e) =>
          authHandler({ e, setData: setLoginData, data: loginData })
        }
        className="bg-white p-6 rounded-lg shadow-md w-80 text-gray-700"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2 text-left">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-md border"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
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
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              required
            />
            <button
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
          type="submit"
          onClick={(e) =>
            authHandler({ e, setData: setLoginData, data: loginData })
          }
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <button
          type="submit"
          onClick={(e) =>
            authHandler({
              e,
              setData: setLoginData,
              data: loginData,
              isGuest: true
            })
          }
          className="w-full bg-white-500 py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white mt-2 border-gray-200 border"
        >
          Login as Guest
        </button>
        <div className="text-gray-700 text-sm pt-2">
          <span>Don't have an account?</span>
          <Link to="/signup" className="font-bold pl-2 underline" replace>
            Create One
          </Link>
        </div>
      </form>
    </div>
  );
};
