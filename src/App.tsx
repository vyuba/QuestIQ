import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./pages/Auth/AuthLayout";
import Login from "./pages/Auth/Login";
import CookieModal from "./components/CookieModal";
import OtpSession from "./pages/Auth/OtpSession";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/Loader";
import { useAuthUser } from "./hooks/useUser";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardLeaderboard from "./pages/Dashboard/DashboardLeaderboard";
import Settings from "./pages/Settings/Settings";
import SettingsHome from "./pages/Settings/SettingsHome";
import SettingsProfile from "./pages/Settings/SettingsProfile";
import { Toaster } from "react-hot-toast";
import DashboardInbox from "./pages/Dashboard/DashboardInbox";
import CreateProject from "./pages/Auth/CreateProject";
import QuizPage from "./pages/Dashboard/QuizPage";
import Quiz from "./pages/Dashboard/Quiz";

function App() {
  const { CheckUser } = useAuthUser();
  const { isLoading } = useQuery({
    queryKey: ["checkUser"],
    queryFn: CheckUser,
  });
  if (isLoading) {
    return <Loader />;
  }

  // toast.custom((t) => (
  //   <div
  //     className={`${
  //       t.visible ? "animate-enter" : "animate-leave"
  //     } max-w-md w-full bg-secondary-color border-2 border-border-color shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 font-neue`}
  //   >
  //     <div className="flex-1 w-0 p-4">
  //       <div className="flex items-start">
  //         <div className="flex-shrink-0 pt-0.5 ">
  //           <img
  //             className="h-10 w-10 rounded-full border-2 border-border-color"
  //             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
  //             alt=""
  //           />
  //         </div>
  //         <div className="ml-3 flex-1">
  //           <p className="text-sm font-medium text-text-color">Emilia Gates</p>
  //           <p className="mt-1 text-sm text-text-secondary-color">
  //             Sure! 8:30pm works great!
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex border-l-2 border-border-color">
  //       <button
  //         onClick={() => toast.dismiss(t.id)}
  //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-text-color hover:text-accent-color focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //       >
  //         <X />
  //       </button>
  //     </div>
  //   </div>
  // ));
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            border: "2px solid var(--border-color)",
            padding: "10px",
            color: "var(--text-color)",
            background: "var(--secondary-color)",
            textTransform: "capitalize",
          },
        }}
      />
      <BrowserRouter>
        <CookieModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="otp-session" element={<OtpSession />} />
            <Route path="create-project" element={<CreateProject />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="leaderboard" element={<DashboardLeaderboard />} />
            <Route path="about-quiz/:id" element={<QuizPage />} />
            <Route path="inbox" element={<DashboardInbox />} />
          </Route>
          <Route path="quiz" element={<Quiz />} />
          <Route path="/settings" element={<Settings />}>
            <Route index element={<SettingsHome />} />
            <Route path="profile" element={<SettingsProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
