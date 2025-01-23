import { useState } from "react";

function CookieModal() {
  const [isVisble, setIsVisble] = useState(true);
  return (
    <div
      className={`fixed z-50 bottom-0 w-full p-3 font-neue ${
        isVisble ? "block" : "hidden"
      }`}
    >
      <div className="flex  flex-col gap-3 border-2 max-w-[400px] border-border-color p-4 rounded-xl bg-secondary-color">
        <div className="flex flex-col gap-1">
          <h1 className="font-neue font-semibold text-xl text-text-color">
            Cookie compliance
          </h1>
          <h1 className="font-medium text-text-secondary-color">
            we use cookies to give you the best possible website experience{" "}
          </h1>
        </div>
        <button
          onClick={() => setIsVisble(false)}
          className={`capitalize font-neue text-text-color font-medium border border-border-color px-3 py-2 rounded-lg bg-background-color `}
        >
          ok, got it
        </button>
      </div>
    </div>
  );
}

export default CookieModal;
