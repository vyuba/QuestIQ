import { NavLink, Outlet, useNavigate, Link } from "react-router";
import { useState } from "react";
import DashboardNavber from "../../components/DashboardNavber";
import {
  ChartBarStacked,
  ImagePlus,
  Inbox,
  LogOut,
  Puzzle,
  Settings,
} from "lucide-react";
import { useAuthUser } from "../../hooks/useUser";
import toast from "react-hot-toast";

function Dashboard() {
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const { handleLogout } = useAuthUser();

  const navigate = useNavigate();

  const DashboardLinks = [
    {
      id: 1,
      pathName: "leaderboard",
      path: "/dashboard/leaderboard",
      icon: <ChartBarStacked />,
    },
    {
      id: 2,
      pathName: "Quizes",
      path: "/dashboard/",
      icon: <Puzzle />,
    },
    {
      id: 3,
      pathName: "inbox",
      path: "/dashboard/inbox",
      icon: <Inbox />,
    },
  ];
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
            isDashboardMenuOpen ? "fixed" : "hidden md:flex"
          } px-2 md:p-0   bg-transparent z-[1000] flex justify-center h-screen overflow-hidden items-end top-0 right-0 md:right-2 md:mr-3`}
        >
          <div className="flex flex-row w-full h-[calc(100dvh-100px)] md:h-[calc(100%-20px)] bg-secondary-color mb-2  border-2 border-border-color rounded-xl  overflow-hidden gap-2 p-2">
            <div className=" w-48 md:w-56 border-2 border-border-color rounded-lg h-full bg-background-color p-2">
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
            <ul className=" md:h-full md:border-none capitalize bg-secondary-color md:bg-transparent text-text-color font-neue text-xl  flex flex-col md:flex-row gap-7  relative">
              {/* <button
              onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
              className="md:hidden p-1 self-end w-fit border-2 rounded-md border-border-color "
            >
              <X className="text-text-color bg-transparent " />
            </button> */}
              <span className="w-12 h-12 bg-background-color rounded-lg border-2 border-border-color"></span>
              {/* <Link to="/auth/login">
              <button className="border border-border-color capitalize p-2 px-4 text-lg rounded-xl bg-secondary w-fit flex flex-row gap-3 items-center">
                <LogOut size={20} />
                <span className="font-medium">log in</span>
              </button>
            </Link> */}
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
