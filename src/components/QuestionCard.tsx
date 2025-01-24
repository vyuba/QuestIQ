import { Check } from "lucide-react";
import React, { useState } from "react";

interface QuestionCard {
  question: string;
  answer: string;
  options: string[];
}
const QuestionCard: React.FC<QuestionCard> = ({
  question,
  options,
  answer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <div
      className={`w-full overflow-hidden h-full bg-secondary-color rounded-xl border-2 border-border-color flex flex-col gap-4 p-4 font-neue text-text-color m-0 mx-auto max-w-[500px]`}
    >
      <span className="text-sm font-medium">Gamerchair</span>
      <span className="font-medium text-base md:text-lg">{question}</span>
      <div className="flex flex-col w-full h-full gap-4">
        {options.map((data, index) => (
          <label
            key={index}
            className={`border border-border-color p-4 text-center font-medium rounded-lg text-sm md:text-base hover:border-accent-color transition-all cursor-pointer relative
            ${selectedAnswer === data ? "bg-accent-color text-white" : ""} ${
              data === answer
                ? "border-2 border-success-color bg-secondary-color text-white"
                : ""
            }`}
          >
            {data === answer && (
              <span className=" absolute bottom-[-10px] right-[-10px] bg-success-color  text-success-dark-color p-1 rounded-full">
                <Check strokeWidth={2.5} />
              </span>
            )}
            <input
              type="radio"
              name="quiz"
              value={data}
              checked={selectedAnswer === data}
              onChange={() => setSelectedAnswer(data)}
              className="hidden"
            />
            {data}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
