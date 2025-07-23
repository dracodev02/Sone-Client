import FukuGame from "@/views/fuku/fukuGame";
import Histories from "@/views/fuku/histories";
import Title from "@/views/fuku/title";

const Fuku = () => {
  return (
    <div className="flex flex-col gap-4">
      <Title />
      <FukuGame />
      <Histories />
    </div>
  );
};

export default Fuku;
