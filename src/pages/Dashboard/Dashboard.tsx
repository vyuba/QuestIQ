import { NavLink, Outlet, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import DashboardNavber from "../../components/DashboardNavber";
import {
  ChartBarStacked,
  ImagePlus,
  Inbox,
  LogOut,
  Puzzle,
  Settings,
} from "lucide-react";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useUser } from "../../store";
import { useAuthUser } from "../../hooks/useUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useProject } from "../../projectStore";
import Loader from "../../components/Loader";

function Dashboard() {
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const { handleLogout } = useAuthUser();
  const { setCurrentProject, currentProject } = useProject();

  const navigate = useNavigate();

  const DashboardLinks = [
    {
      id: 1,
      pathName: "leaderboard",
      path: "/cw/dashboard/leaderboard",
      icon: <ChartBarStacked />,
    },
    {
      id: 2,
      pathName: "Quizes",
      path: "/cw/dashboard/",
      icon: <Puzzle />,
    },
    {
      id: 3,
      pathName: "inbox",
      path: "/cw/dashboard/inbox",
      icon: <Inbox />,
    },
  ];

  const { getUserProjects } = useGetDatabase();
  const { user } = useUser();

  const { isLoading, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => {
      if (user) {
        return getUserProjects(user); // Call the function only if user is not null
      } else {
        // Handle the case when user is null
        return []; // or return an appropriate value
      }
    },
  });

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    if (data) {
      setCurrentProject(data);
    }
  }, [data, setCurrentProject]);

  console.log(data);

  return (
    <div>
      <div className="w-full h-full flex flex-row ">
        <div className="pt-5 w-full h-full">
          <DashboardNavber
            isDashboardMenuOpen={isDashboardMenuOpen}
            setIsDashboardMenuOpen={setIsDashboardMenuOpen}
          />
          <Outlet />
        </div>
        <div
          className={` ${
            isDashboardMenuOpen ? "fixed flex" : "hidden md:flex "
          } px-2 md:p-0   bg-transparent z-[1000]  justify-center h-screen overflow-hidden items-end top-0 pb-10 right-0 md:right-2 md:mr-3  md:w-full md:max-w-[260px]`}
        >
          <div className="flex flex-row w-fit h-[calc(100lvh-9em)] md:h-[calc(100%-20px)] bg-secondary-color mb-2  border-2 border-border-color rounded-xl  overflow-hidden gap-2 p-2">
            <div className=" w-48 md:max-w-[54] border-2 border-border-color rounded-lg h-full bg-background-color p-2">
              <div className="w-full h-[136px] bg-secondary-color border-2 border-border-color rounded-md flex items-center justify-center">
                <ImagePlus
                  size={24}
                  className="text-text-secondary-color bg-transparent "
                />
              </div>
              <ul className="flex flex-col w-full gap-2 pt-2">
                {DashboardLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-text-color bg-secondary-color border-2 p-2 capitalize font-neue border-border-color rounded-md${
                        isActive ? "border-accent-color text-accent-color" : " "
                      }`
                    }
                  >
                    <li className=" w-full flex flex-row gap-2 cursor-pointer">
                      <span className="text-text-secondary-color">
                        {link.icon}
                      </span>
                      {link.pathName}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>
            <ul className=" md:h-full md:border-none capitalize bg-secondary-color md:bg-transparent text-text-color font-neue text-xl  flex flex-col gap-1  relative">
              {currentProject?.map((data) => (
                <NavLink
                  className={({ isActive }) =>
                    ` w-12 h-12 bg-background-color rounded-lg border-2 ${
                      isActive ? "border-accent-color" : "border-border-color"
                    } `
                  }
                  to={`${data?.projectData?.project_name}`}
                  state={data}
                  key={data.$id}
                >
                  <span key={data?.$id} className=""></span>
                </NavLink>
              ))}
              <div className="absolute flex-col gap-5 border-t-2 border-border-color pt-4 bottom-3 flex items-center justify-center  w-full">
                <button>
                  <Link to={"/settings/"}>
                    <Settings className="text-text-secondary-color bg-transparent hover:text-text-color transition-all" />
                  </Link>
                </button>
                <button
                  onClick={() => {
                    toast.promise(
                      handleLogout(navigate),
                      {
                        loading: "Loading",
                        success: () => `Successfully logged out`,
                        error: (err) => `This just happened: ${err.toString()}`,
                      },
                      {
                        style: {
                          minWidth: "250px",
                        },
                        success: {
                          duration: 5000,
                          icon: "🔥",
                        },
                      }
                    );
                  }}
                >
                  <LogOut className="text-text-secondary-color bg-transparent hover:text-text-color transition-all" />
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
