import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../hooks/useDatabase";

function Home() {
  const { getAllProjects } = useGetDatabase();

  const { data, isLoading } = useQuery({
    queryKey: ["allPrjects"],
    queryFn: getAllProjects,
    staleTime: 30 * 1000,
  });

  console.log(data);
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="pt-10  w-full">
        {isLoading ? (
          <div className=" pl-5">
            <div className="card-img w-[200px] h-[20px] mb-4 rounded-md overflow-hidden bg-cover bg-no-repeat bg-gradient-to-br from-[#101228] border border-border-color via-[#181b3d] to-[#383f8e] searchLoader"></div>

            {/* Horizontal Scroll Wrapper */}
            <div className="overflow-x-auto w-full scrollbar-hide">
              <div className="flex gap-3 w-max snap-x snap-mandatory pr-5">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border-border-color rounded-lg w-[400px] flex-shrink-0 h-full border bg-secondary-color p-3 flex flex-col gap-3 snap-center"
                    >
                      <div className="py-2 flex flex-col gap-4">
                        <div className="flex h-5 flex-row gap-2">
                          <h5 className="font-medium rounded-sm border border-border-color flex-1 w-full h-full bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></h5>
                          <p className="font-light rounded-sm border border-border-color w-[100px] h-full bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></p>
                        </div>
                        <h5 className="font-medium rounded-sm border border-border-color w-full h-10 bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></h5>
                        <div className="flex h-5 flex-row justify-between gap-2">
                          <p className="font-light rounded-sm self-end border border-border-color w-[100px] h-5 bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></p>
                          <p className="font-light rounded-sm self-end border border-border-color w-[100px] h-5 bg-gradient-to-br from-[#101228] via-[#181b3d] to-[#383f8e] searchLoader"></p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="capitalize px-5 md:text-lg text-text-color font-neue font-medium py-4">
              Trending quizes
            </h2>
            <div className="overflow-x-auto w-full">
              <div className="w-full py-2 pl-3 grid grid-flow-col  gap-3">
                {data?.map((project) => (
                  <div key={project?.projectData.$id}>
                    {project.quizzes.map((quiz) => (
                      <Link
                        key={project?.projectData.$id}
                        to={`/cw/dashboard/${project?.projectData.project_name}`}
                        state={project}
                      >
                        <Card
                          projectName={project?.projectData.project_name}
                          description={quiz.description}
                          reward={quiz.reward_xp}
                          imageId={project?.projectData?.thumbnail_url}
                        />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
