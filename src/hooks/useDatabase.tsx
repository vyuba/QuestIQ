import { config } from "../lib/env";
import { databases, Query } from "../lib/appwrite";
import { User } from "../store";
import { useState } from "react";
export const useGetDatabase = () => {
  const getUserData = async (user: User) => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.userCollectinId,
        [Query.equal("user_id", user?.$id)]
      );

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return { getUserData };
};
