import { config } from "../lib/env";
import { databases, Query } from "../lib/appwrite";
import { User } from "../store";
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
      return userProjects.flat();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getAllProjects = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.projectCollectinId
      );
      const projectIds = response?.documents.map((doc) => doc.$id);

      if (!projectIds || projectIds.length === 0) return [];

      const userProjects = await Promise.all(
        projectIds.map(async (projectId) => {
          const projectResponse = await databases.listDocuments(
            config.databaseId,
            config.userProjectsQuizId,
            [Query.equal("project_id", projectId)]
          );
          return projectResponse.documents;
        })
      );
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

  const getQuizData = async (id: string) => {
    try {
      const response = await databases.getDocument(
        config.databaseId,
        config.userProjectsQuizId,
        id
      );
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getQuiz = async (id: string) => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.QuizQuestionId,
        [Query.equal("quiz_id", id)]
      );
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    getUserData,
    getAllProjects,
    getUserProjects,
    getProjectQuiz,
    getQuizData,
    getQuiz,
  };
};
