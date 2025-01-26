import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useGetDatabase } from "../hooks/useDatabase";
import { useQuery } from "@tanstack/react-query";
interface Card {
  description: string;
  reward: string;
  projectName: string;
  imageId: string | undefined;
}

const Card: React.FC<Card> = ({
  description,
  reward,
  projectName,
  imageId,
}) => {
  const { handleProjectDp } = useGetDatabase();

  const { data } = useQuery({
    queryKey: ["cardDp", imageId],
    queryFn: () => {
      if (imageId) {
        return handleProjectDp(imageId);
      } else {
        return null;
      }
    },
  });

  return (
    <div className="min-w-[359px] md:min-w-[400px] w-full border-2 border-border-color  cursor-pointer rounded-2xl font-neue text-text-color p-5 grid gap-2 hover:bg-secondary-color hover:scale-[1.02] transition-all ">
      <div className="flex items-center justify-between bg-transparent">
        <div className="capitalize flex flex-row items-center gap-2 bg-transparent">
          <div className="w-10 h-10  rounded-full bg-transparent border-2 border-border-color overflow-hidden ">
            <img src={data as string | undefined} alt="" />
          </div>
          <p className=" md:text-lg font-medium">{projectName}</p>
        </div>
        <ArrowUpRight />
      </div>
      <p className="text-sm md:text-base h-10 overflow-hidden text-ellipsis truncated-text">
        {description}
      </p>
      <div className="flex items-center justify-between text-xs md:text-sm font-medium py-1">
        <span>1.2k participant</span>
        <span className="border-2  border-border-color p-1 px-3 uppercase rounded-full">
          {reward} usdc
        </span>
      </div>
    </div>
  );
};

export default Card;
