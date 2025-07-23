"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ComingSoon = () => {
  const [showIndex, setShowIndex] = useState<number | null>(null);
  const [showVideoIndex, setShowVideoIndex] = useState<number>(0);
  const srcs = [
    "/images/social1.mp4",
    "/images/social2.mp4",
    "/images/social3.mp4",
  ];

  useEffect(() => {
    // Random video index khi component mount
    const randomIndex = Math.floor(Math.random() * srcs.length);
    setShowVideoIndex(randomIndex);

    // Chạy hiệu ứng cho hình ảnh
    let index = 0;
    const interval = setInterval(() => {
      setShowIndex(index);
      index = (index + 1) % 4;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2">
        <Image
          src="/images/television.png"
          alt="coming soon"
          width={600}
          height={600}
        />
        <video
          key={showVideoIndex}
          width={600}
          height={600}
          autoPlay
          loop
          muted
          className="absolute left-[47%] top-[41%] rounded-[16px] -translate-x-1/2 -translate-y-1/2 object-cover w-[69%] h-[38%]"
        >
          <source src={srcs[showVideoIndex]} type="video/mp4" />
        </video>
      </div>
      <Image
        src="/images/watcher.png"
        alt="coming soon"
        width={600}
        height={600}
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-full"
      />
      <Image
        src="/images/comingSoon1.png"
        alt="coming soon"
        width={600}
        height={600}
        className="absolute top-0 right-0"
      />
      {/* {showIndex === 0 && (
        <Image
          src="/images/comingSoon.png"
          alt="coming soon"
          width={300}
          height={300}
          className="absolute bottom-0 right-3 show-coming-soon-to-top"
        />
      )}
      {showIndex === 1 && (
        <Image
          src="/images/comingSoon.png"
          alt="coming soon"
          width={300}
          height={300}
          className="absolute bottom-0 left-3 show-coming-soon-to-top"
        />
      )}
      {showIndex === 2 && (
        <Image
          src="/images/comingSoon.png"
          alt="coming soon"
          width={300}
          height={300}
          className="absolute left-0 top-5 show-coming-soon-to-right"
        />
      )}
      {showIndex === 3 && (
        <Image
          src="/images/comingSoon.png"
          alt="coming soon"
          width={300}
          height={300}
          className="absolute right-5 top-0 show-coming-soon-to-bottom"
        />
      )} */}
    </div>
  );
};

export default ComingSoon;
