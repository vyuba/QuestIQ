import avater from "/src/assets/avater-1.svg";

function DashboardLeaderboard() {
  return (
    <div className="w-full h-[calc(100dvh-100px)] p-5 ">
      <p className="font-neue font-medium text-lg text-text-color pb-4 capitalize">
        Leaderboard
      </p>
      <div className="w-full h-full rounded-lg text-text-color font-neue p-3 border-2 border-border-color bg-secondary-color relative overflow-hidden">
        <div className="w-fit overflow-hidden flex pt-3 pb-4 border-b-2 border-border-color flex-col gap-2 sticky top-0 bg-secondary-color z-10">
          <h1 className="font-medium text-lg">Rewards</h1>
          <p>
            Join projects, solve quizzes, and earn rewards while building your
            Web3 expertise. Start your streak today and rise to the top of the
            leaderboard!
          </p>
        </div>
        <div className="w-full h-full pt-2 flex flex-col gap-5 overflow-y-auto">
          {[...Array(100)].map((user, index) => (
            <div className="flex flex-row items-center gap-3">
              <span className="text-sm">{index}.</span>
              <div
                key={user}
                className="flex flex-1 flex-row gap-3 items-center"
              >
                <div className="w-12 h-12 border border-border-color rounded-full">
                  <img className="w-full p-2" src={avater} alt="" srcSet="" />
                </div>
                <span className="flex-1 flex flex-col gap-2">
                  <span className="w-full flex flex-row items-center justify-between">
                    <p className="">CryptoWhiz</p>
                    <p>1789xp</p>
                  </span>
                  <div className="w-full relative rounded-full py-1 overflow-hidden border border-border-color after:content-[''] after:w-1/2 after:h-full after:bg-accent-color after:absolute after:top-0 after:left-0"></div>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardLeaderboard;
