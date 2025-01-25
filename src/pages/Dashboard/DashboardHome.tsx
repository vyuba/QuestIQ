import { Puzzle } from "lucide-react";
import QuizCard from "../../components/QuizCard";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useLocation } from "react-router";

function DashboardHome() {
  const { getProjectQuiz } = useGetDatabase();
  const location = useLocation();
  const project = location.state;

  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quiz", project?.projectData?.$id],
    queryFn: () =>
      project?.projectData?.$id
        ? getProjectQuiz(project.projectData.$id)
        : Promise.resolve([]),
    enabled: !!project?.projectData?.$id,
  });

  if (!project) return <p className="text-red-500">No project found</p>;
  if (isLoading) return <p>Loading quizzes...</p>;
  if (isError) return <p className="text-red-500">Failed to fetch quizzes</p>;

  return (
    <div className="w-full p-5">
      <header className="w-full flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Puzzle className="stroke-accent-color" />
          <h1 className="text-xl font-medium font-neue text-text-color">
            {project?.projectData?.project_name}
          </h1>
        </span>
        <span className="logo-text text-3xl bg-secondary-color py-2 px-[14px] border-2 border-border-color text-center rounded-full text-text-color font-patriot">
          <p>q</p>
        </span>
      </header>

      <div className="py-5 w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
        {quizzes?.map((quiz) => (
          <QuizCard
            key={quiz?.$id}
            id={quiz?.$id}
            description={quiz?.description}
            reward_xp={quiz?.reward_xp}
            title={quiz?.title}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
