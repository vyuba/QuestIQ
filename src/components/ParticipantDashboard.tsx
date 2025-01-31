import { Puzzle } from "lucide-react";
import QuizCard from "./QuizCard";
import { useGetDatabase } from "../hooks/useDatabase";
import { useUser } from "../store";
import toast from "react-hot-toast";
import { Models } from "appwrite";
import { NavigateFunction } from "react-router";
import React from "react";

interface Props {
  project: {
    projectData: {
      project_name: string;
      $id: string;
    };
  };
  quizzes:
    | {
        Data: {
          quizzes: Models.Document[];
        };
        image: string;
        isMember: boolean;
      }
    | null
    | undefined;
  isMember: boolean | undefined; // Changed from `string` to `boolean`
  navigate: NavigateFunction;
}

const ParticipantDashboard: React.FC<Props> = ({
  project,
  quizzes,
  isMember,
  navigate,
}) => {
  const { handleAddToUserProjects } = useGetDatabase();
  const { user } = useUser();

  return (
    <div>
      <header className="w-full flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Puzzle className="stroke-accent-color" />
          <h1 className="text-xl font-medium font-neue text-text-color">
            {project?.projectData?.project_name}
          </h1>
        </span>
        <span className="logo-text overflow-hidden text-3xl bg-secondary-color  w-12 border-2 border-border-color text-center rounded-full text-text-color font-patriot">
          <img className="w-full" src={quizzes?.image} alt="" />
        </span>
      </header>

      {!isMember && (
        <div className="bg-secondary-color p-6 flex flex-col gap-4 rounded-xl mt-2">
          <span className="text-text-color font-neue">
            Join the community to start completing quests and claiming rewards.
          </span>
          <button
            onClick={async () => {
              try {
                const toastId = toast.loading("Joining project...");

                if (user?.$id) {
                  await handleAddToUserProjects(
                    project?.projectData?.$id,
                    user?.$id
                  );
                }

                toast.dismiss(toastId); // Ensure loading toast is dismissed
                toast.success("Joined project");

                await navigate(
                  `/cw/dashboard/${project?.projectData?.project_name}`,
                  { state: project }
                );
              } catch (error: unknown) {
                toast.dismiss();
                console.log(error);
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Something went wrong"
                );
              }
            }}
            className="bg-accent-color text-text-color capitalize font-neue w-full font-medium rounded-md p-2 border-border-color border-2"
          >
            Join to participate
          </button>
        </div>
      )}

      <div className="py-5 w-full grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
        {quizzes?.Data?.quizzes?.map((data) => (
          <QuizCard
            key={data?.$id}
            Role={isMember}
            id={data?.$id}
            Banner={data?.quizBanner}
            description={data?.description}
            reward_xp={data?.reward_xp}
            title={data?.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantDashboard;
