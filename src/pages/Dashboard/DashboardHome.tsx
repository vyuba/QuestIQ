import { Puzzle } from "lucide-react";
import QuizCard from "../../components/QuizCard";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useLocation } from "react-router";

function DashboardHome() {
  const { getProjectQuiz, handleProjectDp } = useGetDatabase();
  const location = useLocation();
  const project = location.state;

  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quiz", project?.projectData?.$id],
    queryFn: async () => {
      if (project?.projectData?.$id) {
        const quizzes = await getProjectQuiz(project.projectData.$id);
        const image = await handleProjectDp(project.projectData.thumbnail_url);
        return { quizzes, image };
      }
      return null;
    },
    enabled: !!project?.projectData?.$id,
  });
  if (!project) return <p className="text-red-500">No project found</p>;
  if (isLoading) return <p>Loading quizzes...</p>;
  if (isError) return <p className="text-red-500">Failed to fetch quizzes</p>;

  // console.log(project);
  return (
    <div className="w-full p-5">
      <header className="w-full flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Puzzle className="stroke-accent-color" />
          <h1 className="text-xl font-medium font-neue text-text-color">
            {project?.projectData?.project_name}
          </h1>
        </span>
        <span className="logo-text overflow-hidden text-3xl bg-secondary-color  w-16 border-2 border-border-color text-center rounded-full text-text-color font-patriot">
          <img className="w-full" src={quizzes?.image} alt="" />
        </span>
      </header>

      <div className="py-5 w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
        {quizzes?.quizzes?.map((quiz) => (
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
