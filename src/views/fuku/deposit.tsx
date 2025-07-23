import Button from "@/components/button";
import Card from "@/components/card";
import Divider from "@/components/divider";
import Input from "@/components/input";
import { FaEthereum } from "react-icons/fa";

const Deposit = () => {
  return (
    <Card className="liquid-glass flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2.5">
          <div>
            <p className="opacity-75">Players</p>
            <p className="text-xl">36/500</p>
          </div>
          <div>
            <p className="opacity-75">Your Entries</p>
            <div className="flex gap-2 items-center">
              <div className="p-1 rounded-full aspect-square bg-white grid place-items-center">
                <FaEthereum size={16} className="text-black" />
              </div>
              <p className="text-xl">0.2345 ETH</p>
            </div>
          </div>
          <div>
            <p className="opacity-75">Your Win Chance</p>
            <p className="text-xl">10%</p>
          </div>
        </div>
        <Divider className="my-3" />
        <div>
          <div className="pb-4">
            <p className="opacity-50">Input your entry</p>
            <Input
              type="number"
              placeholder="0"
              min={0}
              step={0.000001}
              className="w-full bg-transparent text-3xl"
            />
            <p className="opacity-50">Est Value ($): 0</p>
          </div>
          <div className="px-3 py-1 rounded bg-[#8371E940] w-fit border border-[#61439A]">
            <p>Balance: 20 ETH</p>
          </div>
        </div>
      </div>
      <Button className="w-full mt-3">Deposit</Button>
    </Card>
  );
};

export default Deposit;
