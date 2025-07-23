import Image from "next/image";
import Button from "./button";

const CardGame = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg)",
      }}
      className="rounded-xl bg-background overflow-hidden relative"
    >
      <div className="top-0 left-0 w-full h-full absolute pointer-events-none  bg-gradient-to-b from-transparent via-black/50 to-black blur-3xl"></div>
      <div className="relative z-[1]">
        <Image
          src=""
          alt="Game image"
          width={1920}
          height={1080}
          className="aspect-video"
        />
        <div className="p-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="bg-black rounded-full w-9 h-9 aspect-square"></div>
            <p className="text-white text-lg">Game name</p>
          </div>
          <Button>Play</Button>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
