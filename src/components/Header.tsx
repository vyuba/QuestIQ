import Navbar from "./Navbar";
import mascot1 from "../assets/mascot-1.svg";
import mascot2 from "../assets/mascot-2.svg";

function Header() {
  return (
    <div className="w-full  px-4">
      <div className="w-full h-full border-b-2 border-r-2 border-l-2 rounded-b-xl border-border-color bg-secondary-color relative overflow-hidden py-5">
        <Navbar />
        <img
          className="bg-transparent w-[200px] absolute left-[-40px] bottom-[-10px]"
          src={mascot1}
          alt=""
        />
        <img
          className="bg-transparent w-[150px] absolute right-[20px] top-[80px]"
          src={mascot2}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
