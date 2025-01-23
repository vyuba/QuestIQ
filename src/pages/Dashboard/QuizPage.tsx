import { useParams } from "react-router";

function QuizPage() {
  const id = useParams();

  console.log(id);
  return (
    <div className="w-full  h-[calc(100dvh-100px)] p-5 relative">
      <div className="bg-secondary-color rounded-md border font-neue text-text-color border-border-color w-full h-full p-5">
        <h1 className="text-lg capitalize font-medium">quiz header</h1>
        <div className="flex flex-col gap-2 py-4">
          <span className="capitalize font-medium ">rewards</span>
          <span className="w-32 h-32 bg-background-color rounded-md border border-border-color"></span>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <span className="capitalize font-medium">description</span>
          <span className="capitalize text-lg font-medium">
            Go on the jackput referrral hunt and invite your friends to join
            cryptocasino every Go on the jackput referrral hunt and invite your
            friends to join cryptocasino every Go on the jackput referrral hunt
            and invite your friends to join cryptocasino every
          </span>
        </div>
      </div>

      <div className="font-neue fixed bottom-0 right-0 my-2 px-3 w-full ">
        <button className="bg-accent-color border-2 border-border-color font-medium text-lg capitalize w-full rounded-md py-2 text-text-color ">
          start
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
