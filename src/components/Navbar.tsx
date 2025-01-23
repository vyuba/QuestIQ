import { LogOut, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function Navbar() {
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
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
          <ul className="w-full h-[calc(100dvh-200px)] md:h-full md:border-none border-2 border-border-color rounded-xl  capitalize bg-secondary-color md:bg-transparent text-text-color font-neue text-xl p-8 flex flex-col md:flex-row gap-7 ">
            <button
              onClick={() => setIsHomeMenuOpen(!isHomeMenuOpen)}
              className="md:hidden p-1 self-end w-fit border-2 rounded-md border-border-color "
            >
              <X className="text-text-color bg-transparent " />
            </button>
            <li>home</li>
            <li>How It Works</li>
            <li>Projects</li>
            <li>Leaderboard</li>
            <li>Contact Us</li>
            <Link to="/auth/login">
              <button className="border border-border-color capitalize p-2 px-4 text-lg rounded-xl bg-secondary w-fit flex flex-row gap-3 items-center">
                <LogOut size={20} />
                <span className="font-medium">log in</span>
              </button>
            </Link>
          </ul>
        </div>
        <button
          onClick={() => setIsHomeMenuOpen(!isHomeMenuOpen)}
          className="md:hidden p-1 w-fit border-2 rounded-md border-border-color "
        >
          <Menu className="text-text-color bg-transparent " />
        </button>
      </nav>
      <div className="bg-inherit w-full p-4 grid gap-4">
        <h4 className="bg-inherit logo-text text-2xl font-patriot text-center text-text-color">
          Learn, Play, and Dominate the Web3 Quiz World!
        </h4>
        <p className="bg-inherit font-neue text-text-color text-center text-sm">
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
