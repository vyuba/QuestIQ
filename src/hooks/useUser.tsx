// import { config } from "../lib/env";
import { account, ID } from "../lib/appwrite";
import { useUser } from "../store";
import { NavigateFunction } from "react-router";
export const useAuthUser = () => {
  const { setUserSession, setUser, user } = useUser();
  // const user = useUser((state) => state.user);

  // const checkUserIsNew = async (user: User) => {
  //   try {
  //     if (!user) return null;
  //     const response = await databases.listDocuments(
  //       config.databaseId,
  //       config.userCollectinId,
  //       [Query.equal("user_id", user?.$id)]
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  const handleLogin = async (email: string, navigate: NavigateFunction) => {
    try {
      const sessionToken = await account.createEmailToken(ID.unique(), email);
      const user = sessionToken;
      setUserSession(user);
      console.log(user);
      navigate("/auth/otp-session");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleLogout = async (navigate: NavigateFunction) => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  const CheckUser = async () => {
    try {
      const isLoggedIn = await account.get();
      setUser(isLoggedIn);
      console.log(user);
      return isLoggedIn; // ✅ Return the result
    } catch (error) {
      console.error("Error checking user:", error);
      throw new Error("Failed to check user");
    }
  };

  return { handleLogin, CheckUser, handleLogout };
};
