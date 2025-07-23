import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`border-none bg-transparent focus:outline-none focus:ring-0 ${className}`}
    />
  );
};

export default Input;
