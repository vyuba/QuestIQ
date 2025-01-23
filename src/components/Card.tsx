import { ArrowUpRight } from "lucide-react";

function Card() {
  return (
    <div className="min-w-[329px] border-2 border-border-color max-w-[420px] cursor-pointer rounded-2xl font-neue text-text-color p-5 grid gap-2 hover:bg-secondary-color transition-colors">
      <div className="flex items-center justify-between bg-transparent">
        <div className="capitalize flex flex-row items-center gap-2 bg-transparent">
          <div className="w-10 h-10  rounded-full bg-transparent border-2 border-border-color"></div>
          <p className="text-lg font-medium">project name</p>
        </div>
        <ArrowUpRight />
      </div>
      <p className="">
        Dive into the world of [Web3 Stars], where innovation meets blockchain.
        Complete quizzes to test your knowledge about decentralized
        applications, NFTs, and smart contracts, and earn rewards while you
        learn!
      </p>
      <div className="flex items-center justify-between text-sm font-medium py-1">
        <span>1.2k participant</span>
        <span className="border-2  border-border-color p-1 px-3 uppercase rounded-full">
          2000 usdc
        </span>
      </div>
    </div>
  );
}

export default Card;
