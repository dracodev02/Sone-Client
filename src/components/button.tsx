interface Props {
  mode?: "dark" | "light";
  isLiquidGlass?: boolean;
}

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement> & Props> = ({
  children,
  className,
  mode,
  isLiquidGlass = true,
  ...props
}) => {
  return (
    <button
      className={`relative
        inline-flex
        items-center
        justify-center
        px-6
        py-2
        text-white
        font-medium
        rounded-2xl
        hover:bg-white/20
        active:bg-white/30 
        focus:outline-none
        focus:ring-2
        focus:ring-white/50
        transition-all
        duration-200
        ease-in-out
        ${isLiquidGlass && "liquid-glass"}
        ${
          mode &&
          (mode === "dark"
            ? "!backdrop-brightness-75 !text-black"
            : "!backdrop-brightness-125 !text-black")
        }
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
