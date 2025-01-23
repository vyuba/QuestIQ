import { Puzzle } from "lucide-react";
import QuizCard from "../../components/QuizCard";
import { Link } from "react-router";

function DashboardHome() {
  return (
    <div className="w-full p-5">
      <header className="w-full flex items-center justify-between">
        <span className=" flex items-center justify-center gap-2">
          <Puzzle className="stroke-accent-color" />
          <h1 className="text-xl font-medium font-neue text-text-color">
            Quest
          </h1>
        </span>
        <span className=" flex items-center justify-center  logo-text text-3xl bg-secondary-color py-2 px-[14px] border-2 border-border-color text-center rounded-full text-text-color font-patriot">
          <p>q</p>
        </span>
      </header>
      <div className="py-5 w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
        <Link to={"about-quiz"}>
          <QuizCard />
        </Link>
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}

export default DashboardHome;
