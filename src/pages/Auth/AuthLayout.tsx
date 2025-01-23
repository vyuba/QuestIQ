import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="w-full h-screen p-6">
      <div className="w-full flex justify-between items-center">
        <span className="logo-text text-text-color text-2xl font-semibold font-patriot">
          QuestIQ
        </span>
        <button className="border bg-secondary-color hover:bg-opacity-0 transition-all border-border-color px-2 p-1 rounded-xl text-text-color font-neue font-medium capitalize ">
          create account
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
