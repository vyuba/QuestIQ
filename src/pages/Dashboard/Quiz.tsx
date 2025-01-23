import { ArrowLeft } from "lucide-react";
import QuestionCard from "../../components/QuestionCard";
import { useState } from "react";

function Quiz() {
  const quizQuestions = [
    {
      question: "What is the primary benefit of blockchain gaming?",
      options: [
        "Faster gameplay",
        "True ownership of assets",
        "Better graphics",
        "Lower internet usage",
      ],
      correctAnswer: "True ownership of assets",
    },
    {
      question: "Which token standard is commonly used for gaming NFTs?",
      options: ["ERC-20", "ERC-721", "ERC-1155", "BEP-2"],
      correctAnswer: "ERC-721",
    },
    {
      question: "What is 'play-to-earn' in Web3 gaming?",
      options: [
        "A free gaming model",
        "Earning rewards by playing games",
        "A subscription-based service",
        "A type of NFT marketplace",
      ],
      correctAnswer: "Earning rewards by playing games",
    },
    {
      question: "Which blockchain is widely used for Web3 gaming?",
      options: ["Ethereum", "Solana", "Polygon", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What does a gaming DAO do?",
      options: [
        "Creates in-game assets",
        "Governs game decisions",
        "Mines new tokens",
        "Develops new games",
      ],
      correctAnswer: "Governs game decisions",
    },
    {
      question: "Which of these is NOT a Web3 gaming feature?",
      options: [
        "Decentralized ownership",
        "NFT-based items",
        "Cloud-based gaming",
        "Tokenized rewards",
      ],
      correctAnswer: "Cloud-based gaming",
    },
    {
      question: "What is a key advantage of using smart contracts in gaming?",
      options: [
        "Cheaper game purchases",
        "Automated and trustless transactions",
        "Improved FPS performance",
        "Better storyline",
      ],
      correctAnswer: "Automated and trustless transactions",
    },
    {
      question:
        "Which of these platforms is commonly used to develop Web3 games?",
      options: ["Unity", "Unreal Engine", "Godot", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What role do NFTs play in Web3 gaming?",
      options: [
        "They act as in-game currencies",
        "They represent unique game assets",
        "They are used to mine new tokens",
        "They improve game graphics",
      ],
      correctAnswer: "They represent unique game assets",
    },
    {
      question: "Which of these is a play-to-earn game?",
      options: ["Axie Infinity", "Call of Duty", "Minecraft", "FIFA"],
      correctAnswer: "Axie Infinity",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < quizQuestions.length - 1
        ? prevIndex + 1
        : quizQuestions.length - 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : 0));
  };
  return (
    <div className="p-5">
      <div className="flex relative pt-3 items-center justify-between">
        <button className="text-text-color p-2 rounded-lg border-2 border-border-color">
          <ArrowLeft className="text-text-secondary-color" />
        </button>
        <span className="text-lg font-neue font-semibold text-text-color absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%]">
          {activeIndex} of {quizQuestions.length - 1}
        </span>
        <span className="logo-text text-text-color font-medium font-patriot text-xl">
          QuestIQ
        </span>
      </div>
      <div className="w-full my-10 relative rounded-full py-1 overflow-hidden border border-border-color">
        <div
          className="absolute top-0 left-0 h-full bg-accent-color transition-all duration-300"
          style={{
            width: `${
              activeIndex !== quizQuestions.length - 1 ? 10 * activeIndex : 100
            }%`,
          }} // Dynamically set width
        ></div>
      </div>
      <div className="w-full h-full relative ">
        <QuestionCard
          key={activeIndex}
          z={quizQuestions[activeIndex]}
          question={quizQuestions[activeIndex].question}
          options={quizQuestions[activeIndex].options}
          answer={quizQuestions[activeIndex].correctAnswer}
        />
        {activeIndex < quizQuestions.length - 1 && (
          <div className="absolute w-[calc(100%-20px)] bottom-[-11px] right-0 -z-[1] overflow-hidden">
            <QuestionCard
              key={activeIndex + 1}
              z={quizQuestions[activeIndex + 1]}
              question={quizQuestions[activeIndex + 1].question}
              options={quizQuestions[activeIndex + 1].options}
              answer={quizQuestions[activeIndex + 1].correctAnswer}
            />
          </div>
        )}
      </div>
      <div className="flex w-full gap-2 right-0 px-3 fixed bottom-0 flex-row justify-between items-center py-5">
        <button
          onClick={handlePrev}
          className=" capitalize text-text-color font-neue bg-accent-color border-2 border-border-color py-2 px-5 rounded-md font-medium"
        >
          prev
        </button>
        <button
          disabled={activeIndex !== quizQuestions.length - 1 ? true : false}
          className={` capitalize text-text-color font-neue  border-2 border-border-color flex-1 py-2 px-5 rounded-md font-medium ${
            activeIndex !== quizQuestions.length - 1
              ? "bg-secondary-color cursor-not-allowed"
              : "bg-accent-color cursor-pointer"
          }`}
        >
          {activeIndex !== quizQuestions.length - 1 ? "can't submit" : "submit"}
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
