import { LucideArrowUpRight } from "lucide-react";
import Image404 from "../assets/404svg.svg";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <img
          className="min-w-[300px] w-full max-w-[600px]"
          src={Image404}
          alt=""
        />
        <Link
          to={"/"}
          className="font-neue font-medium text-text-color capitalize hover:underline hover:text-accent-color flex flex-row"
        >
          <span>Redirect by back to the homepage</span>
          <LucideArrowUpRight />
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
