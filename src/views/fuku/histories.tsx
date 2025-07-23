"use client";
import Card from "@/components/card";
import { useState } from "react";
import HistoryItem from "./historyItem";

const Histories = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "youWin">("all");

  return (
    <Card className="bg-white">
      <div className="flex justify-between items-center">
        <h2>
          <strong>Round history</strong>
        </h2>
        <div className="rounded-full bg-background">
          <div className="m-1 grid grid-cols-2 relative">
            <div
              className={`absolute top-0 w-1/2 h-full bg-white rounded-full shadow-lg transition-all ease-[cubic-bezier(0,1.26,.86,1.27)] ${
                selectedTab === "all" ? "left-0" : "left-1/2"
              }`}
            ></div>
            <div
              className="rounded-full grid place-items-center hover:bg-white/50 transition-all relative z-[1] cursor-pointer"
              onClick={() => setSelectedTab("all")}
            >
              <p
                className={`text-center transition-all  ${
                  selectedTab == "all" ? "opacity-100" : "opacity-50"
                }`}
              >
                All
              </p>
            </div>
            <div
              className="rounded-full px-4 py-1 whitespace-nowrap grid place-items-center hover:bg-white/50 transition-all relative z-[1] cursor-pointer"
              onClick={() => setSelectedTab("youWin")}
            >
              <p
                className={`text-center transition-all ${
                  selectedTab == "youWin" ? "opacity-100" : "opacity-50"
                }`}
              >
                Your win
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-auto flex gap-4 mt-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <HistoryItem key={index} />
        ))}
      </div>
    </Card>
  );
};

export default Histories;
