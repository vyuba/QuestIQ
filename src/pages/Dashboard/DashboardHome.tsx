import { Puzzle } from "lucide-react";
import QuizCard from "../../components/QuizCard";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useState, useEffect } from "react";
function DashboardHome() {
  const { getProjectQuiz } = useGetDatabase();
  const [quiz, setQuiz] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => getProjectQuiz("67923c4e002d674b3986"),
  });
  useEffect(() => {
    if (data) {
      setQuiz(data);
    }
  }, [data]);

  console.log(quiz);

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
        {quiz.map((data) => (
          <QuizCard
            key={data?.$id}
            id={data?.$id}
            description={data?.description}
            reward_xp={data?.reward_xp}
            title={data?.title}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
