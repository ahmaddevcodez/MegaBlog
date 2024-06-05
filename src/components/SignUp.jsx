import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as loginAction } from "../store/authSlice";
import {  CommonBtn } from "./index";
import CommonInput from "./pages/pagesUI/CommonInput";


import Logo from "./logo/Logo";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const createAccount = async (data) => {
    try {
      setError("");
      const userData = await authService.createAccount(data);
      dispatch(loginAction(userData));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)} className="mt-6">
          <div className="space-y-4">
            <CommonInput
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full Name is required",
                maxLength: {
                  value: 50,
                  message: "Full Name must not exceed 50 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}

            <CommonInput
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <CommonInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <CommonBtn
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              type="submit"
            >
              Create Account
            </CommonBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
