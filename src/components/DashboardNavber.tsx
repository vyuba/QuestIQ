import { Menu, X, LogOut, Image, ImagePlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function DashboardNavber({ setIsDashboardMenuOpen, isDashboardMenuOpen }) {
  return (
    <div className="w-full">
      <nav className="bg-inherit flex items-center justify-between p-5">
        <span className="font-patriot bg-transparent text-xl stroke-accent-color logo-text text-text-color">
          QuestIQ
        </span>

        <button
          onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
          className="md:hidden p-1 w-fit border-2 rounded-md border-border-color  relative z-[20000]"
        >
          {isDashboardMenuOpen ? (
            <X className="text-text-color bg-transparent " />
          ) : (
            <Menu className="text-text-color bg-transparent " />
          )}
        </button>
      </nav>
    </div>
  );
}

export default DashboardNavber;
