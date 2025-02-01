import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ImagePlus,
  InfinityIcon,
  LucideTimer,
} from "lucide-react";
import { useState } from "react";

interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

function CreateQuiz() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isInfinite, setIsInfinite] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [startDay, setStartDay] = useState("1");
  const [startMonth, setStartMonth] = useState("January");
  const [endDay, setEndDay] = useState("1");
  const [endMonth, setEndMonth] = useState("January");

  console.log(image);

  const handleImageChange = (event: ImageChangeEvent): void => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file)); // Create a URL for the uploaded file
    }
  };

  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date(0, 0, 0, hour, minute);
        times.push({
          value: time
            .toLocaleTimeString("en-US", { hour12: false })
            .slice(0, 5),
          label: time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStart = e.target.value;
    setStartTime(newStart);

    // Auto-adjust end time if it's before start time
    if (newStart > endTime && !isInfinite) {
      setEndTime(newStart);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <div className="inset-0 fixed z-[100000000] bg-background-color ">
      <form className="bg-background-color  p-5 m-0 mx-auto w-full max-w-[500px]">
        <div className="flex relative pt-3 items-center justify-between">
          <button className="text-text-color p-2 rounded-lg border-2 bg-secondary-color border-border-color">
            <ArrowLeft className="text-text-secondary-color" />
          </button>
          <span className="logo-text text-text-color font-medium font-patriot text-xl">
            QuestIQ
          </span>
        </div>
        <span className="text-lg text-text-color font-neue font-medium flex py-4 capitalize">
          create quiz
        </span>
        <div className="w-full flex flex-col gap-5">
          <div
            className="border-2 border-dashed relative 
           bg-secondary-color rounded-lg h-40 border-border-color w-full hover:border-accent-color transition-all cursor-pointer p-2"
          >
            <label className=" w-full h-full" htmlFor="image-upload">
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <ImagePlus
                  size={30}
                  className="stroke-border-color absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden w-full h-full"
            />
          </div>
          <span className="text-text-secondary-color font-neue text-sm font-medium">
            Recommended size is 256x256px
          </span>
          {/* <div className="flex flex-col gap-1 w-full font-neue"> */}
          <label
            className="text-text-color text-sm font-medium flex flex-col gap-1 w-full font-neue"
            htmlFor="QuizTitle"
          >
            <span>Quiz Title</span>
            <input
              className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0"
              type="text"
              name="name"
              // value={communityForm.name || ""}
              id="communityName"
              placeholder="e.g Quiz name"
              // onChange={handleFormChange}
            />
          </label>
          {/* </div> */}
        </div>

        <div className="flex-col flex gap-4 pt-4">
          <div className="flex flex-col gap-1 w-full font-neue">
            <label
              className="capitalize font-medium text-text-color text-sm"
              htmlFor="quizDescription"
            >
              quiz description
            </label>
            <textarea
              className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0 h-[150px]"
              name="description"
              // value={communityForm.description || ""}
              // onChange={handleFormChange}
              id="communityDescription"
              placeholder="e.g quiz description"
            />
          </div>
          <div className="flex flex-col gap-1 w-full font-neue">
            <label
              className="capitalize font-medium text-text-color text-sm"
              htmlFor="quizDuration"
            >
              quiz duration
            </label>
            <input
              className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0"
              type="text"
              name="websiteLink"
              // value={communityForm.websiteLink || ""}
              // onChange={handleFormChange}
              id="communityWebsite"
              placeholder="e.g 3 hours"
            />
          </div>
          <div className="flex flex-col gap-1 w-full font-neue">
            <label
              className="capitalize font-medium text-text-color text-sm"
              htmlFor="quizDuration"
            >
              reward
            </label>
            <input
              className="bg-secondary-color placeholder:text-text-secondary-color text-text-color p-2 border-2 border-border-color rounded-md outline-none  autofill:bg-background-color autofill:border-none  focus:outline-accent-color focus:ring-0"
              type="text"
              name="websiteLink"
              // value={communityForm.websiteLink || ""}
              // onChange={handleFormChange}
              id="communityWebsite"
              placeholder="e.g 1000 USDC"
            />
          </div>

          <div className="flex flex-row gap-2 w-full items-center">
            {/* Start Time Section */}
            <label className="capitalize w-full font-neue gap-1 font-medium text-text-color text-sm flex flex-col">
              <span>Start Time</span>
              <div className="w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2">
                <LucideTimer className="mr-2" size={24} />
                <select
                  value={startTime}
                  onChange={handleStartTimeChange}
                  className="bg-transparent w-full focus:outline-none appearance-none"
                >
                  {timeOptions.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
                <ArrowDown className="ml-2" size={24} />
              </div>

              {/* Start Date Selection */}
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <div className="w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2">
                    <select
                      value={startDay}
                      onChange={(e) => setStartDay(e.target.value)}
                      className="bg-transparent w-full focus:outline-none appearance-none"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                    <ArrowDown className="ml-2" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2">
                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className="bg-transparent w-full focus:outline-none appearance-none"
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <ArrowDown className="ml-2" size={24} />
                  </div>
                </div>
              </div>
            </label>

            {/* End Time Section */}
            <label className="capitalize w-full font-neue gap-1 font-medium text-text-color text-sm flex flex-col">
              <div className="flex justify-between items-center">
                <span>End Time</span>
                <div className="flex items-center gap-2">
                  <InfinityIcon size={24} />
                  <input
                    type="checkbox"
                    checked={isInfinite}
                    onChange={(e) => setIsInfinite(e.target.checked)}
                    className="w-4 h-4 accent-accent-color"
                  />
                </div>
              </div>
              <div className="w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2">
                <LucideTimer className="mr-2" size={24} />
                <select
                  value={endTime}
                  onChange={handleEndTimeChange}
                  disabled={isInfinite}
                  className={`bg-transparent w-full focus:outline-none appearance-none ${
                    isInfinite ? "opacity-50" : ""
                  }`}
                >
                  {timeOptions.map((time) => (
                    <option
                      key={time.value}
                      value={time.value}
                      disabled={time.value < startTime && !isInfinite}
                    >
                      {time.label}
                    </option>
                  ))}
                </select>
                <ArrowUp className="ml-2" size={24} />
              </div>

              {/* End Date Selection */}
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <div
                    className={`w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2 ${
                      isInfinite ? "opacity-50" : ""
                    }`}
                  >
                    <select
                      value={endDay}
                      onChange={(e) => setEndDay(e.target.value)}
                      disabled={isInfinite}
                      className="bg-transparent w-full focus:outline-none appearance-none"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                    </select>
                    <ArrowDown className="ml-2" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className={`w-full flex items-center text-text-color rounded-lg border-2 bg-secondary-color border-border-color p-2 ${
                      isInfinite ? "opacity-50" : ""
                    }`}
                  >
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
                      disabled={isInfinite}
                      className="bg-transparent w-full focus:outline-none appearance-none"
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <ArrowDown className="ml-2" size={24} />
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="fixed p-5 bottom-0 right-0 w-full ">
          <button
            type="submit"
            className="p-3 w-full text-text-color font-neue capitalize font-medium bg-accent-color border-2 border-border-color rounded-lg"
          >
            create quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuiz;
