const RoundStatus = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 rounded-full bg-green/15 w-fit">
      <p>
        <span className="text-white">Round #1235 - </span>
        <span className="text-green">Start in: 30m : 45s</span>
      </p>
    </div>
  );
};

export default RoundStatus;
