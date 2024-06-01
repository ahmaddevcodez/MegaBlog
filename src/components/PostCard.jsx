"use client";
import React from "react";
import PropTypes from "prop-types";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

export function BackgroundGradientDemo({
  $id,
  title,
  featuredImage,
  paragraph,
}) {
  return (
    <Link to={`/post/${$id}`}>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
          src={appwriteService.filePreview(featuredImage)}
          alt={title}
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {paragraph}
        </p>
        {/* <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button> */}
      </BackgroundGradient>
    </Link>
  );
}

// Define prop types
BackgroundGradientDemo.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default BackgroundGradientDemo;
