import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useLocation, useNavigate } from "react-router";
import ParticipantDashboard from "../../components/ParticipantDashboard";
import AdminDashboard from "../../components/AdminDashboard";
import { useUser } from "../../store";

function DashboardHome() {
  const { getProjectQuiz, handleProjectDp, checkUserProjectMembership } =
    useGetDatabase();
  const { user } = useUser();
  const location = useLocation();
  const project = location.state;
  const navigate = useNavigate();

  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quiz", project?.projectData?.$id],
    queryFn: async () => {
      if (project?.projectData?.$id && user?.$id) {
        const isMember = await checkUserProjectMembership(
          user?.$id,
          project?.projectData?.$id
        );
        const quizzes = await getProjectQuiz(project.projectData.$id);
        const image = await handleProjectDp(project.projectData.thumbnail_url);

        return { Data: { quizzes }, image, isMember };
      }
      if (quizzes?.isMember) {
        navigate(`/cw/dashboard/${project?.projectData?.project_name}`, {
          state: project,
        });
      }
      return null;
    },
    enabled: !!project?.projectData?.$id && !!user?.$id,
  });

  if (!project) return <p className="text-red-500">No project found</p>;

  if (isLoading) {
    return (
      <div className="px-5">
        <div className="card-img w-full h-[50px] mb-4 rounded-lg  overflow-hidden bg-cover bg-no-repeat bg-gradient-to-br from-[#101228] border border-border-color  via-[#181b3d] to-[#383f8e] searchLoader"></div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-3 ">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="border-border-color rounded-lg max-w-full h-full border bg-secondary-color p-3 flex flex-col gap-3"
              >
                <div className="card-img rounded-md w-full h-[100px] overflow-hidden bg-cover bg-no-repeat bg-gradient-to-br from-[#101228] border border-border-color  via-[#181b3d] to-[#383f8e] searchLoader"></div>
                <div className="py-2 flex flex-col gap-4">
                  <div className="flex h-5 flex-row gap-2">
                    <h5 className="font-medium rounded-sm border border-border-color flex-1 w-full h-full bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></h5>
                    <p className="font-light rounded-sm  border border-border-color w-[100px] h-full bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></p>
                  </div>
                  <h5 className="font-medium rounded-sm border border-border-color   w-full h-10 bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></h5>
                  <p className="font-light rounded-sm self-end  border border-border-color  w-[100px] h-5 bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (isError) return <p className="text-red-500">Failed to fetch quizzes</p>;

  console.log(quizzes);
  console.log(project);

  const Role = project?.role;

  // if (quizzes?.isMember) {
  //   navigate(`/cw/dashboard/${project?.projectData?.project_name}`, {
  //     state: project,
  //   });
  // }

  // admin
  return (
    <div className="w-full p-5">
      {Role !== "admin" && (
        <ParticipantDashboard
          navigate={navigate}
          isMember={quizzes?.isMember}
          project={project}
          quizzes={quizzes}
        />
      )}

      {Role === "admin" && <AdminDashboard />}
    </div>
  );
}

export default DashboardHome;
