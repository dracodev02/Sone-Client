import Card from "@/components/card";
import { IoIosArrowBack } from "react-icons/io";

const Title = () => {
  return (
    <Card className="bg-white flex gap-4 items-center">
      <IoIosArrowBack size={20} />
      <div>
        <h2>
          <strong>Wheel of Fortunes</strong>
        </h2>
        <p>1 winner takes all the pool! Lucky is in your hand</p>
      </div>
    </Card>
  );
};

export default Title;
