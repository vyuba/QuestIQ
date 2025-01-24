import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../../hooks/useDatabase";

function QuizPage() {
  const { id } = useParams();
  const { getQuizData } = useGetDatabase();

  const { data } = useQuery({
    queryKey: ["quizPage"],
    queryFn: () => getQuizData(id),
  });

  console.log(data);
  return (
    <div className="w-full  h-[calc(100dvh-100px)] p-5 relative">
      <div className="bg-secondary-color rounded-md border font-neue text-text-color border-border-color w-full h-full p-5">
        <h1 className="text-lg capitalize font-medium">{data?.title}</h1>
        <div className="flex flex-col gap-2 py-4">
          <span className="capitalize font-medium ">rewards</span>
          <span className="w-32 h-32 bg-background-color rounded-md border border-border-color flex items-end justify-center">
            <span className="bg-secondary-color rounded-t-xl border font-neue font-medium text-sm border-border-color px-4 py-1">
              {data?.reward_xp}xp
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <span className="capitalize font-medium">description</span>
          <span className="capitalize  text-lg font-medium">
            {data?.description}
          </span>
        </div>
      </div>

      <div className="font-neue fixed bottom-0 right-0 my-2 px-3 w-full ">
        <Link to={`/quiz/${""}/${id}`}>
          <button className="bg-accent-color border-2 border-border-color font-medium text-lg capitalize w-full rounded-md py-2 text-text-color ">
            start
          </button>
        </Link>
      </div>
    </div>
  );
}

export default QuizPage;
