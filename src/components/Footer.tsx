import { Search } from "lucide-react";
import mascot3 from "../assets/mascot-3.svg";
import mascot2 from "../assets/mascot-2.svg";
function Footer() {
  return (
    <div className="w-full h-full py-10 relative flex justify-end">
      <div className="w-[79%] h-full mb-10 flex relative z-[1] flex-col gap-4 bg-secondary-color border-2 rounded-l-xl p-4 border-border-color">
        <span className="text-text-color logo-text text-xl font-patriot">
          QuestIQ
        </span>
        <div className="w-full flex flex-col gap-10 font-neue text-text-color py-1">
          <div className="w-full grid gap-1">
            <span className="font-neue text-text-color font-medium text-lg">
              About
            </span>
            <p className="">
              Our platform brings gamified learning to Web3. Join quizzes, earn
              rewards, and stay ahead in the blockchain era
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-neue capitalize text-text-color font-medium text-lg">
              quick links
            </span>
            <ul className="capitalize flex flex-col gap-2">
              <li>home</li>
              <li>How It Works</li>
              <li>Projects</li>
              <li>Leaderboard</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="w-full grid gap-1">
            <span className="font-neue text-text-color font-medium text-lg">
              Connect With Us
            </span>
            <p className="">Follow us for updates and new quizzes!</p>
          </div>
          <div className="w-full grid gap-1">
            <span className="font-neue text-text-color font-medium text-lg">
              Contact Info
            </span>
            <p className="">Have questions? Reach out to us!</p>
          </div>
          <div className="w-full grid gap-1">
            <span className="font-neue text-text-color font-medium text-lg">
              Newsletter
            </span>
            <p className="">
              Subscribe for the latest quizzes and rewards updates!
            </p>
            <div className="bg-secondary-color flex items-center font-neue flex-row border border-border-color p-2 py-3 min-w-62  my-2 rounded-md">
              <Search className="bg-inherit text-text-color" />
              <input
                className="bg-inherit pl-2 text-text-color h-full flex-1 outline-none"
                placeholder="Search for projects"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute bottom-36 w-[180px] left-[-20px]"
        src={mascot2}
        alt=""
      />
      <img className="absolute bottom-0 left-0" src={mascot3} alt="" />
    </div>
  );
}

export default Footer;
