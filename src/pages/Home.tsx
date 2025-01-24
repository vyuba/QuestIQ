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

  console.log(data);

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
          <div className="w-full py-2 pl-3 grid grid-flow-col   gap-3">
            {data?.map((data) => (
              <Link key={data.$id} to={``}>
                <Card description={data.description} reward={data.reward_xp} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-10  w-full">
        <h2 className="px-5 capitalize md:text-lg text-text-color font-neue font-medium py-4">
          Recommended quests
        </h2>
        <div className="overflow-x-auto w-full">
          <div className="w-full   py-2 pl-3  grid grid-flow-col   gap-3">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
