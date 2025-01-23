import { ArrowLeftIcon, Menu } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { useNavigate } from "react-router";
function Settings() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col md:flex-row gap-3 p-4 font-neue text-text-color">
      <div className="md:hidden py-3 w-full flex flex-row justify-between items-center">
        <span className="logo-text flex items-center gap-4 text-text-color font-semibold text-xl">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 border border-border-color rounded-md"
          >
            <ArrowLeftIcon />
          </button>
          <span> QuestIQ </span>
        </span>
        <button className="p-2 border-2 border-border-color rounded-md">
          <Menu />
        </button>
      </div>
      <div className="w-48 hidden md:block h-full bg-secondary-color border border-border-color rounded-lg p-3">
        <span className="w-full flex flex-row items-center text-text-secondary-color font-medium  cursor-pointer gap-2 capitalize ">
          <button className="bg-secondary-color text-text-secondary-color  ">
            <ArrowLeftIcon />
          </button>
          <span>project</span>
        </span>
        <h1 className="py-1 font-medium text-lg">Settings</h1>
        <div className="pt-4">
          <span className="text-text-secondary-color font-medium capitalize">
            user
          </span>
          <ul className="capitalize py-1">
            <NavLink to={"/settings/profile"}>
              <li>profile</li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="flex-1 h-full border border-border-color rounded-lg bg-secondary-color p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
