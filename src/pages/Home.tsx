import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useGetDatabase } from "../hooks/useDatabase";

function Home() {
  const { getAllProjects } = useGetDatabase();

  const { data } = useQuery({
    queryKey: ["allPrjects"],
    queryFn: getAllProjects,
  });

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="pt-10  w-full">
        <h2 className="capitalize px-5 md:text-lg text-text-color font-neue font-medium py-4">
          Trending quizes
        </h2>
        <div className="overflow-x-auto w-full">
          <div className="w-full py-2 pl-3 grid grid-flow-col  gap-3">
            {data?.map((project) => (
              <div key={project.$id}>
                {project.quizzes.map((quiz) => (
                  <Link
                    to={`/cw/dashboard/${project.project_name}`}
                    state={project}
                  >
                    <Card
                      projectName={project.project_name}
                      description={quiz.description}
                      reward={quiz.reward_xp}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
