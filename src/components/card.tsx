import React from "react";

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`px-4 py-6 rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
