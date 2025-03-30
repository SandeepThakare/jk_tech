import React from "react";

export const Button = ({ children, variant = "primary", isLoading, ...props }) => {
  const baseStyles =
    "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}; 