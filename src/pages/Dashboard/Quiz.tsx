import { ArrowLeft } from "lucide-react";
import QuestionCard from "../../components/QuestionCard";
import { useState } from "react";
import { useParams } from "react-router";
import { useGetDatabase } from "../../hooks/useDatabase";
import { useQuery } from "@tanstack/react-query";
function Quiz() {
  const { id } = useParams();
  const { getQuiz } = useGetDatabase();
  const { data } = useQuery({
    queryKey: ["quizes"],
    queryFn: () => getQuiz(id),
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < data?.total - 1 ? prevIndex + 1 : data?.total - 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : 0));
  };

  console.log(data);
  return (
    <div className="p-5 relative h-[calc(100vh-100px)]">
      <div className="flex relative pt-3 items-center justify-between">
        <button className="text-text-color p-2 rounded-lg border-2 border-border-color">
          <ArrowLeft className="text-text-secondary-color" />
        </button>
        <span className="text-lg font-neue font-semibold text-text-color absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%]">
          {activeIndex} of {data?.total - 1}
        </span>
        <span className="logo-text text-text-color font-medium font-patriot text-xl">
          QuestIQ
        </span>
      </div>
      <div className="w-full my-10 relative rounded-full py-1 overflow-hidden border border-border-color">
        <div
          className="absolute top-0 left-0 h-full bg-accent-color transition-all duration-300"
          style={{
            width: data?.total
              ? `${(activeIndex / (data.total - 1)) * 100}%`
              : "0%", // Fallback for missing data
          }}
        ></div>
      </div>
      <div className="w-full h-fit relative ">
        {data !== undefined && (
          <>
            <QuestionCard
              key={activeIndex}
              question={data?.documents[activeIndex]?.question_text}
              options={data?.documents[activeIndex]?.options}
              answer={data?.documents[activeIndex]?.correctAnswer}
            />

            {activeIndex < data?.total - 1 && (
              <div className="absolute w-[calc(100%-20px)] bottom-[-11px] right-0 -z-[1] overflow-hidden">
                <QuestionCard
                  key={activeIndex + 1}
                  question={data?.documents[activeIndex + 1]?.question_text}
                  options={data?.documents[activeIndex + 1]?.options}
                  answer={data?.documents[activeIndex + 1]?.correct_answer}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex w-full gap-2 right-0 px-3 absolute bottom-0 flex-row justify-between items-center py-5">
        <button
          onClick={handlePrev}
          className=" capitalize text-text-color font-neue bg-accent-color border-2 border-border-color py-2 px-5 rounded-md font-medium"
        >
          prev
        </button>
        <button
          disabled={activeIndex !== data?.total - 1 ? true : false}
          className={` capitalize text-text-color font-neue  border-2 border-border-color flex-1 py-2 px-5 rounded-md font-medium ${
            activeIndex !== data?.total - 1
              ? "bg-secondary-color cursor-not-allowed"
              : "bg-accent-color cursor-pointer"
          }`}
        >
          {activeIndex !== data?.total - 1 ? "can't submit" : "submit"}
        </button>
        <button
          onClick={handleNext}
          className=" capitalize text-text-color font-neue bg-accent-color border-2 border-border-color py-2 px-5 rounded-md font-medium"
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
