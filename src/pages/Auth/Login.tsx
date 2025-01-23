import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useUser";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { handleLogin } = useAuthUser();

  useEffect(() => {
    if (email !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, isDisabled, setIsDisabled]);

  return (
    <div>
      <div className="py-10 font-neue grid gap-2">
        <h1 className="text-xl font-semibold text-text-color">
          Log in to QuestIQ
        </h1>
        <span className="font-medium text-text-secondary-color">
          Welcome back!{" "}
        </span>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label
            className="text-text-color font-neue font-medium text-sm"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-background-color border outline-accent-color outline-2 border-border-color p-3 rounded-lg font-neue text-text-color"
            placeholder="e.g example@gmail.com"
            type="email"
          />
        </div>
        <button
          disabled={isDisabled}
          className={`capitalize font-neue text-text-color font-medium border-2 border-border-color px-3 py-2 rounded-lg ${
            isDisabled
              ? "cursor-not-allowed bg-secondary-color"
              : "bg-accent-color"
          } `}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            toast.promise(
              handleLogin(email, navigate),
              {
                loading: "Loading",
                success: () => `Successfully sent otp `,
                error: (err) => `This just happened: ${err.toString()}`,
              },
              {
                style: {
                  minWidth: "250px",
                },
                success: {
                  duration: 5000,
                  icon: "🔥",
                },
              }
            );
          }}
        >
          login with email
        </button>
      </form>
    </div>
  );
}

export default Login;
