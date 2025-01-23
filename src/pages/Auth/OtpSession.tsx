import React, { useState } from "react";
import { useNavigate } from "react-router";
import { account } from "../../lib/appwrite";
import { type Models } from "appwrite";
import { useUser } from "../../store";
// import { useAuthUser } from "../../hooks/useUser";

interface Session extends Models.Token {
  $id: string;
  $createdAt: string;
  userId: string;
  secret: string;
  expire: string;
  phrase: string;
}

function OtpSession() {
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const { session } = useUser();

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs]; // Create a copy of the state
    newInputs[index] = e.target.value; // Update the specific index

    if (e.target.value !== "") {
      const next = e.target.nextElementSibling as HTMLInputElement | null;
      if (next) {
        next.focus();
      }
    } else {
      return;
    }
    setInputs(newInputs); // Set the new state
  };

  const handleKeyUp = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if ("key" in e) {
      const key = e.key.toLowerCase();

      if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling as HTMLInputElement | null;
        if (prev) {
          prev.focus();
        }
        return;
      }
    }
  };

  console.log(session);

  const secret = inputs.join("");
  const isOtpComplete = inputs.every((val) => val !== "");
  const handleOtpSubmit = async (UserSession: Session | null) => {
    try {
      if (UserSession) {
        const session = await account.createSession(
          UserSession?.userId,
          secret
        );
        console.log(session);
      }
      // const response = await checkUserIsNew(user?.$id);
      // if (response !== null) {
      //   navigate("/auth/signup");
      // }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (isOtpComplete) {
    handleOtpSubmit(session);
  }
  return (
    <div className="w-full h-full py-10 flex flex-col gap-8 max-w-[500px] mx-auto m-0">
      <div className="grid gap-2 place-items-center text-center">
        <span className="text-text-color font-neue text-2xl font-medium">
          Check your inbox
        </span>
        <p className="text-text-secondary-color font-normal font-neue">
          We've sent a code to preyealexander731@gmail.com. Please enter the
          code immediately, as it will soon expire.
        </p>
      </div>
      <form
        className="items-center justify-center flex flex-col gap-3 "
        action=""
      >
        <div className="inputs flex flex-row gap-2 font-neue text-text-color">
          {inputs.map((value, index) => (
            <input
              key={index}
              onKeyUp={(e) => handleKeyUp(e)}
              className="otp-inputs bg-transparent text-center border border-border-color w-12 h-12 rounded-xl"
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleOtp(e, index)}
            />
          ))}
        </div>
        <button className="capitalize hover:font-medium text-text-secondary-color font-neue transition-all">
          resend code
        </button>
      </form>
    </div>
  );
}

export default OtpSession;
