import { Link } from "react-router";

interface Quiz {
  description: string;
  reward_xp: string;
  title: string;
  id: string;
}
const QuizCard: React.FC<Quiz> = ({ description, reward_xp, title, id }) => {
  return (
    <Link to={`about-quiz/${id}`}>
      <div className="text-text-color font-neue bg-secondary-color border-2 border-border-color rounded-xl flex flex-col p-3">
        <div className="border-2 h-20 border-border-color rounded-md">
          <img src="" alt="" />
        </div>
        <div className="flex justify-between py-2 items-center">
          <h1 className="font-medium text-lg">{title}</h1>
          <span className="font-medium border border-border-color p-1 px-2 rounded-2xl">
            {reward_xp}USDC
          </span>
        </div>
        <p className="py-1">{description}</p>
        <span className="py-2 font-medium self-end">Timer: 1min 15sec</span>
      </div>
    </Link>
  );
};

export default QuizCard;
