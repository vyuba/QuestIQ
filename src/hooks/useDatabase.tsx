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

  const getUserProjects = async (user: User) => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.userProjectsCollectionId,
        [Query.equal("user_id", user?.$id)]
      );

      //   console.log(response);

      const projectIds = response?.documents.map((doc) => doc.user_project_id);

      if (!projectIds || projectIds.length === 0) return [];

      const userProjects = await Promise.all(
        projectIds.map(async (projectId) => {
          const projectResponse = await databases.listDocuments(
            config.databaseId,
            config.projectCollectinId,
            [Query.equal("$id", projectId)]
          );
          return projectResponse.documents;
        })
      );

      //   console.log(userProjects.flat());

      return userProjects.flat();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getProjectQuiz = async (projectId: string) => {
    try {
      const projectQuiz = await databases.listDocuments(
        config.databaseId,
        config.userProjectsQuizId,
        [Query.equal("project_id", projectId)]
      );
      return projectQuiz.documents;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return { getUserData, getUserProjects, getProjectQuiz };
};
