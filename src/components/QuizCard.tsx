import { Link } from "react-router";

interface Quiz {
  description: string;
  reward_xp: string;
  title: string;
  id: string;
  Banner: string;
}

import { useGetDatabase } from "../hooks/useDatabase";
import { useQuery } from "@tanstack/react-query";
const QuizCard: React.FC<Quiz> = ({
  description,
  reward_xp,
  title,
  id,
  Banner,
}) => {
  const { handleQuizBanner } = useGetDatabase();

  const { data } = useQuery({
    queryKey: ["quizBanner", Banner],
    queryFn: async () => handleQuizBanner(Banner),
  });

  console.log(data?.BannerImage);

  return (
    <Link to={`about-quiz/${id}`}>
      <div className="text-text-color font-neue bg-secondary-color border-2 border-border-color rounded-xl flex flex-col p-3  overflow-hidden">
        <div className="border-2 h-20 border-border-color rounded-md">
          <img className="w-full h-full" src={data?.BannerImage} alt="" />
        </div>
        <div className="flex justify-between py-2 items-center">
          <h1 className="font-medium text-base md:text-lg">{title}</h1>
          <span className="font-medium border border-border-color p-1 px-2 rounded-2xl text-sm md:text-base">
            {reward_xp}USDC
          </span>
        </div>
        <p className="py-1 h-10 overflow-hidden text-ellipsis truncated-text capitalize text-sm md:text-base">
          {description}
        </p>
        <span className="py-2 font-medium self-end text-sm md:text-base">
          Timer: 1min 15sec
        </span>
      </div>
    </Link>
  );
};

export default QuizCard;
