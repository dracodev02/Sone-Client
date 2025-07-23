"use client";
import Divider from "@/components/divider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Tab {
  name: string;
  href: string;
}

const SideBar = () => {
  const pathname = usePathname();
  const tabs: Tab[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "FUKU",
      href: "/fuku",
    },
    {
      name: "Discover",
      href: "/discover",
    },
    {
      name: "Rewards",
      href: "/rewards",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
    },
    {
      name: "My wallet",
      href: "/my-wallet",
    },
  ];

  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  const renderTab = (tab: (typeof tabs)[number]) => {
    return (
      <Link
        className={`${
          activeTab?.href == tab.href ? "text-[#1E1E1E]" : "text-[#1E1E1E]/50"
        }  text-lg flex gap-4 items-center font-semibold`}
        href={tab.href}
      >
        <div
          className={`w-8 h-8 aspect-square rounded ${
            activeTab
              ? activeTab.href == tab.href &&
                "bg-gradient-to-br from-[#E83C61] to-[#9950E9]"
              : "border border-background"
          }`}
        ></div>
        {tab.name}
      </Link>
    );
  };

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.href === pathname);

    if (activeTab) {
      setActiveTab(activeTab);
    }
  }, [pathname]);

  return (
    <div className="w-[253px] bg-white h-screen px-4 py-6">
      <h1 className="font-modernWarfare text-4xl text-gradient w-fit leading-[52px]">
        SONE
      </h1>
      <Divider />
      <div className="flex flex-col gap-4 py-6">
        {tabs.map((tab) => (
          <div key={tab.name} className="flex gap-2">
            {renderTab(tab)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
