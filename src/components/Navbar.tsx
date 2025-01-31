import { LogOut, Menu, Search, Settings, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useUser, useProfile } from "../store";
import { useAuthUser } from "../hooks/useUser";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { result } from "../lib/appwrite";
import { type Models } from "appwrite";

export interface ProfileOp extends Models.DocumentList<Models.Document> {
  name: string;
}

function Navbar() {
  const { user } = useUser();
  const { profile } = useProfile();
  const { handleLogout } = useAuthUser();
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const navigate = useNavigate();
  console.log(profile);
  return (
    <div className="bg-transparent relative z-[2]">
      <nav className="bg-inherit flex items-center justify-between p-5">
        <span className="font-patriot bg-transparent text-xl stroke-accent-color logo-text text-text-color">
          QuestIQ
        </span>
        <div
          className={` ${
            isHomeMenuOpen ? "fixed" : "hidden md:flex"
          } px-5 md:p-0 bg-background-color md:bg-transparent z-[1000000] flex justify-center h-screen md:h-full overflow-hidden items-center inset-0 md:static`}
        >
          <ul className="w-full relative h-[calc(100dvh-200px)] md:h-full md:border-none border-2 border-border-color rounded-xl   bg-secondary-color md:bg-transparent text-text-color font-neue text-lg px-3 py-4 md:px-0 md:py-0 flex flex-col md:flex-row gap-3 ">
            <button
              onClick={() => setIsHomeMenuOpen(!isHomeMenuOpen)}
              className="md:hidden p-1 self-end w-fit border-2 rounded-md border-border-color "
            >
              <X className="text-text-color bg-transparent " />
            </button>
            <Link
              className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer"
              to={"/create-project"}
            >
              Create Community
            </Link>
            <li className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer">
              Communities
            </li>
            <li className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer">
              How it works
            </li>
            <li className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer">
              Projects
            </li>
            <li className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer">
              Leaderboard
            </li>
            <li className="font-medium hover:bg-background-color pl-5 py-3 rounded-2xl md:py-0 md:pl-0 cursor-pointer">
              Contact Us
            </li>
            {user !== null ? (
              <div className="w-full md:w-fit flex flex-col md:items-center gap-2 absolute p-5 md:p-0 md:justify-normal bg-secondary-color  md:static bottom-0 right-0  border-t-2 border-border-color md:hidden">
                <div className="md:hidden flex items-center gap-2">
                  <span className="w-10 h-10 bg-background-color p-2 items-center border border-border-color flex rounded-full">
                    <img className="" src={result} alt="" />
                  </span>
                  <span className="text-base font-medium">
                    {profile?.documents[0]?.name}
                  </span>
                </div>
                <div className="md:w-fit flex flex-row items-center gap-2">
                  <Link
                    className="border flex-1 md:flex-none border-border-color capitalize p-2 px-4 text-base rounded-xl bg-secondary w-fit flex flex-row gap-2 items-center justify-center md:justify-normal hover:bg-background-color"
                    to={"/cw/settings/profile"}
                  >
                    <Settings size={18} />
                    <span className="font-medium">Account settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      toast.promise(
                        handleLogout(navigate),
                        {
                          loading: "Loading",
                          success: () => `Successfully logged out`,
                          error: (err) =>
                            `This just happened: ${err.toString()}`,
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
                    className="border border-border-color capitalize p-2 px-4 text-base rounded-xl bg-secondary w-fit flex flex-row gap-2 items-center hover:bg-danger-dark-color hover:text-danger-color"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">log out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-fit flex flex-row items-center gap-2 absolute p-5 md:p-0 md:justify-normal  md:static bottom-0 right-0  border-t-2 border-border-color">
                <Link className="flex-1 md:flex-none" to="/auth/login">
                  <button className="border-2  w-full  border-border-color  p-2 px-4  rounded-2xl text-base bg-secondary md:w-fit font-medium hover:bg-background-color flex flex-row gap-3 items-center justify-center">
                    Log in
                  </button>
                </Link>
                <button className=" font-neue flex-1 md:flex-none text-text-color font-medium  bg-accent-color text-base p-2 md:w-fit border-2 rounded-2xl border-border-color ">
                  Create an account
                </button>
              </div>
            )}
          </ul>
        </div>
        <div className="flex md:hidden flex-row items-center gap-3">
          {user !== null ? (
            <button className="md:hidden font-neue text-text-color font-medium capitalize bg-secondary-color p-2 w-fit border-2 rounded-xl border-border-color ">
              communities
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="md:hidden font-neue text-text-color font-medium  bg-secondary-color p-2 w-fit border-2 rounded-2xl border-border-color ">
                  <span className="font-medium">Log in</span>
                </button>
              </Link>
            </>
          )}
          <button
            onClick={() => setIsHomeMenuOpen(!isHomeMenuOpen)}
            className="md:hidden p-2 w-fit border-2 rounded-2xl border-border-color bg-accent-color  "
          >
            <Menu className="text-text-color   " />
          </button>
        </div>
      </nav>
      <div className="bg-inherit w-full p-4 grid gap-4">
        <h4 className="bg-inherit logo-text text-2xl font-patriot text-center text-text-color md:text-3xl">
          Learn, Play, and Dominate the Web3 Quiz World!
        </h4>
        <p className="bg-inherit font-medium font-neue text-text-color text-center text-sm md:text-base lg:text-lg">
          Join projects, solve quizzes, and earn rewards while building your
          Web3 expertise. Start your streak today and rise to the top of the
          leaderboard!
        </p>
      </div>
      <div className="flex items-start justify-center w-full bg-inherit mt-8">
        <div className="bg-secondary-color flex items-center font-neue flex-row border border-border-color p-2 py-3 min-w-72  rounded-md">
          <Search className="bg-inherit text-text-color" />
          <input
            className="bg-inherit pl-2 text-text-color h-full flex-1 outline-none"
            placeholder="Search for projects"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
