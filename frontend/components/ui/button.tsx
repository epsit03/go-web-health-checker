import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};
