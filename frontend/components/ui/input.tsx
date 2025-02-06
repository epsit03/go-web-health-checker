import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring focus:ring-blue-200"
    />
  );
};
