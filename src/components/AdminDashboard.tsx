import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../hooks/useDatabase";
import React from "react";
import CreateQuiz from "./CreateQuiz";

interface Props {
  project: {
    projectData: {
      project_name: string;
      $id: string;
    };
  };
}

const AdminDashboard: React.FC<Props> = ({ project }) => {
  const { getQuizList } = useGetDatabase();

  const { data: quiz } = useQuery({
    queryKey: ["adminAllQuizes"],
    queryFn: async () => {
      if (project?.projectData?.$id) {
        return await getQuizList(project?.projectData?.$id);
      }
      return null;
    },
  });

  return (
    <div className="w-full h-[calc(100dvh-140px)] flex flex-col gap-3">
      <CreateQuiz />
      <span className="capitalize text-text-color font-neue text-lg">
        all quizzes
      </span>
      <div className="w-full bg-secondary-color p-3 rounded-xl h-full overflow-y-auto border-border-color border-2">
        <div className="w-full overflow-x-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500">
          <div className="min-w-max  flex flex-col  text-text-color font-neue capitalize rounded-md gap-3 items-center">
            {quiz?.documents?.map((data) => (
              <div
                key={data?.$id}
                className="bg-background-color w-full  p-4 rounded-lg flex gap-8 items-center"
              >
                <span>{data?.title}</span>
                <span>{data?.reward_xp}xp</span>
                <span className="text-green-500">active</span>
              </div>
            ))}
          </div>
        </div>
        <button className="flex capitalize flex-row text-text-secondary-color font-neue text-sm items-center font-medium hover:text-accent-color  transition-all my-3">
          <Plus size={20} />
          <span>add new quiz</span>
        </button>
      </div>
      <div className="w-full">
        <button className="w-full bg-accent-color text-text-color capitalize font-medium font-neue p-3 rounded-lg border-2 border-border-color">
          create quiz
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
