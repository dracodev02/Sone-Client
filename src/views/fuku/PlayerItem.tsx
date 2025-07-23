const PlayerItem = () => {
  return (
    <div className="flex justify-between gap-2 items-center bg-[#9C63FA20] rounded-md overflow-hidden p-3 border-r-4 border-green mb-3">
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 rounded-full aspect-square bg-white grid place-items-center"></div>
        <p className="">0x002...3456</p>
      </div>
      <div className="flex flex-col gap-1 justify-end">
        <p className="text-end">57.50%</p>
        <p className="text-end text-xs opacity-50">0.0023 ETH</p>
      </div>
    </div>
  );
};

export default PlayerItem;
