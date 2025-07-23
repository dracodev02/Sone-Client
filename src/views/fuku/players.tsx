import Card from "@/components/card";
import PlayerItem from "./PlayerItem";

const Players = () => {
  return (
    <Card className="liquid-glass h-full flex flex-col">
      <div className="flex justify-between items-center">
        <p className="opacity-75">Players</p>
        <p className="text-xl">36/500</p>
      </div>
      <div className="mt-3 flex-1 overflow-auto">
        {Array.from({ length: 20 }).map((_, index) => (
          <PlayerItem key={index} />
        ))}
      </div>
    </Card>
  );
};

export default Players;
