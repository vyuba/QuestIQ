function QuizCard() {
  return (
    <div className="text-text-color font-neue bg-secondary-color border-2 border-border-color rounded-xl flex flex-col p-3">
      <div className="border-2 h-20 border-border-color rounded-md">
        <img src="" alt="" />
      </div>
      <div className="flex justify-between py-2 items-center">
        <h1 className="font-medium text-lg">Quiz Title</h1>
        <span className="font-medium border border-border-color p-1 px-2 rounded-2xl">
          2000 USDC
        </span>
      </div>
      <p className="py-1">
        Join projects, solve quizzes, and earn rewards while building your Web3
        expertise. Start your streak today and rise to the top of the
        leaderboard!
      </p>
      <span className="py-2 font-medium self-end">Timer: 1min 15sec</span>
    </div>
  );
}

export default QuizCard;
