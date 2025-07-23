"use client";
import Image from "next/image";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@/components/card";
import RoundStatus from "./roundStatus";
import Deposit from "./deposit";
import Players from "./players";
import {
  KuroData,
  PoolStatus,
  TimeEnum,
  useKuro,
} from "@/contexts/KuroContext";
import { formatEther } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppKitAccount } from "@reown/appkit/react";
import { KuroParticipant } from "@/types/round";
import {
  colors,
  getTotalEntriesByTokenAddress,
  getUserEntries,
  mapToData,
} from "./helper";

const FukuGame = () => {
  const { kuroData, winnerData, refetchHistories, poolStatus, setPoolStatus } =
    useKuro();

  const [timeToShowWinner, setTimeToShowWinner] = useState<number>(
    TimeEnum._15SECS
  );
  const { address } = useAppKitAccount();
  const [progress, setProgress] = useState<number>(0.5);
  const [pool, setPool] = useState<Map<string, number>>(new Map());
  const [spinDuration, setSpinDuration] = useState<number>(TimeEnum._5SECS);
  const [fullRotations, setFullRotations] = useState<number>(5);
  const [isYouAreWinner, setIsYouAreWinner] = useState(false);
  const [tokenMap, setTokenMap] = useState<Map<string, number>>(new Map());
  const [timeRemaining, setTimeRemaining] = useState<number>(
    timeToShowWinner / 1000
  );
  const [wheelWidth, setWheelWidth] = useState<number>(400);
  const [maxHeight, setMaxHeight] = useState<number>(624);

  const chartRef = useRef<HTMLDivElement>(null);
  const wheelContainer = useRef<HTMLDivElement>(null);
  const depositRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<HTMLDivElement>(null);
  const gridContainer = useRef<HTMLDivElement>(null);
  const calculateTotalPool = (map: Map<string, number>): number => {
    let totalPool = 0;
    map.forEach((value) => {
      totalPool += value;
    });
    return totalPool;
  };

  const calculateDegCornerByOwner = (
    address: string,
    map: Map<string, number>
  ): number => {
    const poolOfOwner = map.get(address);
    const totalPool = calculateTotalPool(map);
    let ownerDeg = 0;

    if (!poolOfOwner) return 0;
    if (totalPool === 0) return 0;

    ownerDeg = (360 * poolOfOwner) / totalPool;
    return ownerDeg;
  };
  const calculateRangeDegByOwner = (
    owner: string,
    map: Map<string, number>
  ): { start: number; end: number } => {
    let startDeg = 0;
    let endDeg = 0;

    for (const [key] of map) {
      if (key !== owner) {
        startDeg += calculateDegCornerByOwner(key, map);
      } else {
        endDeg = startDeg + calculateDegCornerByOwner(owner, map);
        break;
      }
    }

    return { start: startDeg, end: endDeg };
  };
  const countdown = (seconds: number): void => {
    // Kiểm tra nếu số giây âm thì không chạy
    if (seconds < 0) {
      return;
    }

    let remainingTime = seconds;

    // Tạo một interval chạy mỗi 1 giây (1000ms)
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        setTimeRemaining(remainingTime);
      } else {
        setTimeRemaining(timeToShowWinner / 1000);

        clearInterval(timer);
      }
    }, 1000);
  };

  const updateTimer = async () => {
    if (kuroData?.startTime && kuroData.endTime) {
      const now = new Date().getTime() / 1000;

      const rangeTime = kuroData?.endTime - kuroData.startTime;
      const process = now - kuroData?.startTime;

      if (process > rangeTime) {
        setProgress(0);
      } else {
        setProgress(1 - process / rangeTime);
      }
    }
  };

  const spinWheel = useCallback(
    async (winner: string) => {
      if (pool.size == 0) return;

      if (!pool.has(winner)) {
        toast.error(`Winner ${winner} is not exists`);
        return;
      }

      const { start, end } = calculateRangeDegByOwner(winner, pool);

      const targetAngle =
        start +
        (end - start) / 2 +
        ((end - start) / 2) * (Math.random() * 1.6 - 0.8);
      const adjustmentAngle = 360 * fullRotations + targetAngle;

      if (chartRef.current) {
        const chartContainer = chartRef.current;
        chartContainer.style.transform = `rotate(${-adjustmentAngle}deg)`;
        chartContainer.style.transition = `transform ${spinDuration}ms ease-out`;

        setTimeout(() => {
          setPoolStatus(PoolStatus.SHOWING_WINNER);
          countdown(timeToShowWinner / 1000);
          setIsYouAreWinner(winner === address);
          refetchHistories(1);
          chartContainer.style.transform = `rotate(${-targetAngle}deg)`;
          chartContainer.style.transition = `none`;

          // show popup người chiến thắng chỗ này
        }, spinDuration);
      }
    },
    [poolStatus]
  );

  useEffect(() => {
    if (!kuroData) return;

    const newPool = new Map<string, number>();

    if (kuroData.participants.length > 0) {
      kuroData.participants.forEach((player: KuroParticipant) => {
        if (getUserEntries(player.address, kuroData) > 0) {
          newPool.set(player.address, getUserEntries(player.address, kuroData));
        }
      });
    } else if (parseFloat(kuroData.totalValue) > 0) {
      // Fallback nếu chưa có thông tin players
      newPool.set("Current Pool", parseFloat(kuroData.totalValue));
    }
    setPool(newPool);

    const mapToken = getTotalEntriesByTokenAddress(kuroData);
    setTokenMap(mapToken);
  }, [kuroData]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeOut: NodeJS.Timeout | null = null;

    if (
      poolStatus === PoolStatus.WAIT_FOR_FIST_DEPOSIT ||
      poolStatus === PoolStatus.WAITING_FOR_NEXT_ROUND ||
      poolStatus === PoolStatus.DRAWING_WINNER
    ) {
      return;
    } else if (poolStatus === PoolStatus.DEPOSIT_IN_PROGRESS) {
      interval = setInterval(updateTimer, 10);
    } else if (poolStatus === PoolStatus.SPINNING && winnerData) {
      spinWheel(winnerData.winner);
    } else if (poolStatus === PoolStatus.SHOWING_WINNER) {
      timeOut = setTimeout(() => {
        setPoolStatus(PoolStatus.WAITING_FOR_NEXT_ROUND);
      }, timeToShowWinner);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [poolStatus, winnerData]);

  useEffect(() => {
    if (isYouAreWinner) {
      setTimeout(() => {
        setIsYouAreWinner(false);
      }, TimeEnum._9SECS);
    }
  }, [isYouAreWinner]);

  useEffect(() => {
    if (wheelContainer.current) {
      // add listener to resize the chart
      window.addEventListener("resize", handleResize);
      // call the function on the first render
      handleResize();

      return () => {
        // remove the event listener on cleanup
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleResize = () => {
    if (wheelContainer.current) {
      const containerWidth = wheelContainer.current.clientWidth;
      const containerHeight = wheelContainer.current.clientHeight;
      setWheelWidth(containerWidth);
      setMaxHeight(containerHeight);
    }
  };

  return (
    <Card className="bg-gradient-to-b from-[#100d18] to-[#59439e] text-white">
      <div className="grid place-items-center">
        <RoundStatus />
      </div>
      <div ref={gridContainer} className="grid grid-cols-4 gap-4">
        <Deposit />

        <div
          ref={wheelContainer}
          className="col-span-2 grid place-items-center"
        >
          <div className="relative h-fit w-fit rounded-full p-3">
            <Image
              src={"/images/arrow.svg"}
              alt="arrow"
              width={50}
              height={50}
              className="absolute left-1/2 top-[20%] z-10 -translate-x-1/2 rotate-180"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
              {(poolStatus === PoolStatus.DEPOSIT_IN_PROGRESS ||
                poolStatus === PoolStatus.WAIT_FOR_FIST_DEPOSIT) && (
                <>
                  <p className="text-center opacity-50">ETH</p>
                  <p className="text-center font-gajraj text-[52px] leading-[52px] my-2">
                    {formatEther(kuroData?.totalValue || "0")}
                  </p>
                  <p className="text-center opacity-50">Deposited</p>
                </>
              )}

              {poolStatus === PoolStatus.DRAWING_WINNER && (
                <>
                  <p className="ellipsis text-center opacity-50">
                    Drawing winner
                  </p>
                </>
              )}

              {poolStatus === PoolStatus.SHOWING_WINNER && (
                <>
                  <p className="text-center opacity-50">
                    Winner is {winnerData?.winner.slice(0, 6)}...
                    {winnerData?.winner.slice(-4)}
                  </p>
                  <p className="text-center opacity-50">
                    Next round in {timeRemaining}s
                  </p>
                </>
              )}
            </div>
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rotate-90">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <defs>
                  <clipPath id="circleClip">
                    <path
                      d={`
                     M 50 5
                     A 45 45 0 ${progress > 0.5 ? 1 : 0} 1 ${
                        50 + 45 * Math.cos(2 * Math.PI * progress - Math.PI / 2)
                      } ${
                        50 + 45 * Math.sin(2 * Math.PI * progress - Math.PI / 2)
                      }
                     L 50 50
                     Z
                   `}
                      fill="#000"
                    />
                  </clipPath>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#fff13f"
                  strokeWidth="1"
                  strokeDasharray="5 2" // Tạo hiệu ứng dashed
                  clipPath="url(#circleClip)"
                  style={{
                    transition: "all 1s linear", // Hiệu ứng mượt mà
                    transform: "rotate(-90deg)", // Bắt đầu từ đỉnh
                    transformOrigin: "center",
                  }}
                  className="transition-all duration-500"
                />
              </svg>
            </div>
            <div
              ref={chartRef}
              style={{
                position: "relative",
                width: `${wheelWidth - 20}px`,

                transformOrigin: "center center",
              }}
              className="pool-wheel-custom"
            >
              <PieChart
                series={[
                  {
                    innerRadius: wheelWidth / 2 - 50,
                    outerRadius: wheelWidth / 2 - 10,
                    paddingAngle: 2,
                    cornerRadius: 40,
                    startAngle: 0,
                    endAngle: 360,
                    data:
                      mapToData(pool).length > 0
                        ? mapToData(pool).map((d, index) => ({
                            label: formatEther(d.label),
                            id: d.label,
                            value: Number(d.value),
                            color: colors[index % colors.length],
                          }))
                        : [
                            {
                              label: "No Data",
                              id: "no-data",
                              value: 1,
                              color: "#4DFFFF",
                            },
                          ],

                    valueFormatter: (value: { value: number }) => {
                      return mapToData(pool).length > 0
                        ? `${value.value}`
                        : "No deposits yet";
                    },

                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 150,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                margin={{ right: 5 }}
                width={wheelWidth - 10}
                height={wheelWidth - 10}
                hideLegend={true}
              />
            </div>
          </div>
        </div>
        <div
          style={{ maxHeight: `${maxHeight}px` }}
          ref={playersRef}
          className="flex flex-col gap-2"
        >
          <Players />
        </div>
      </div>
    </Card>
  );
};

export default FukuGame;
