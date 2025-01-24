import { Menu, X } from "lucide-react";
import React from "react";

interface DashboardNavberprops {
  setIsDashboardMenuOpen: (isDashboardMenuOpen: boolean) => void;
  isDashboardMenuOpen: boolean;
}

const DashboardNavber: React.FC<DashboardNavberprops> = ({
  setIsDashboardMenuOpen,
  isDashboardMenuOpen,
}) => {
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
};

export default DashboardNavber;
