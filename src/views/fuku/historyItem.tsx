import Button from "@/components/button";
import Card from "@/components/card";

const HistoryItem = () => {
  return (
    <Card className="bg-background py-4">
      <div className="flex flex-col gap-2">
        <p>Round 1</p>
        <p className="text-[#9C63FA] text-xl">X244</p>
        <p>0x0023...3456</p>
        <div className="flex justify-between gap-1 whitespace-nowrap">
          <p>Pool win</p>
          <p>0.2345 ETH</p>
        </div>
      </div>
      <Button mode="dark" className="w-full mt-3">
        Claim
      </Button>
    </Card>
  );
};

export default HistoryItem;
