interface Props {
  className?: string;
  style?: React.CSSProperties;
  axis?: "x" | "y";
}

const Divider: React.FC<Props> = ({ className, style, axis = "x" }) => {
  return (
    <div
      className={`${
        axis === "x" ? "w-full " : "h-full"
      } border-b-[1px] border-background ${className}`}
      style={style}
    ></div>
  );
};

export default Divider;
