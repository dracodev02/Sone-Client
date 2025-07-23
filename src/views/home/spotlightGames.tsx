import Button from "@/components/button";
import Card from "@/components/card";
import CardGame from "@/components/cardGame";
import { FiInfo } from "react-icons/fi";

const SpotlightGames = () => {
  return (
    <Card className="bg-white">
      <div>
        <h2>
          <strong>Spotlight Games</strong>
        </h2>
        <h3>Dive in the Somnia network with supreme games</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-9">
        <CardGame />
        <CardGame />
        <CardGame />
      </div>
      <Card className="mt-6 bg-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiInfo size={20} />
          <p>
            Want to join us, and have your games published on Sone? We are happy
            to do that
          </p>
        </div>
        <Button mode="light">Contact us</Button>
      </Card>
    </Card>
  );
};

export default SpotlightGames;
