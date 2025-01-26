import { config } from "../lib/env";
import { databases, Query, storage } from "../lib/appwrite";
import { User, useProfile } from "../store";
import { Quiz } from "../pages/Dashboard/QuizPage";
import { QuizData } from "../pages/Dashboard/Quiz";
import { ProfileOp } from "../components/Navbar";
export const useGetDatabase = () => {
  const { setProfile } = useProfile();
  const getUserData = async (user: User): Promise<ProfileOp | null> => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.userCollectinId,
        [Query.equal("user_id", user?.$id)]
      );
      setProfile(response as ProfileOp);
      return response as ProfileOp;
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

      const projects = response?.documents;
      if (!projects || projects.length === 0) return [];

      const userProjects = await Promise.all(
        projects.map(async (project) => {
          const projectResponse = await databases.listDocuments(
            config.databaseId,
            config.projectCollectinId,
            [Query.equal("$id", project?.user_project_id)]
          );

          return {
            ...project, // Spread the current user's project
            projectData: projectResponse.documents[0] || null, // Include related project data
          };
        })
      );

      return userProjects;
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

      if (!response?.documents || response.documents.length === 0) return [];

      const projectsWithQuizzes = await Promise.all(
        response.documents.map(async (project) => {
          const projectId = project.$id;

          // Fetch quizzes related to this project
          const quizResponse = await databases.listDocuments(
            config.databaseId,
            config.userProjectsQuizId,
            [Query.equal("project_id", projectId)]
          );

          return {
            projectData: { ...project }, // Include project details
            quizzes: quizResponse.documents || [], // Attach quiz data
          };
        })
      );

      return projectsWithQuizzes;
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

  const getQuizData = async (id: string): Promise<Quiz | null> => {
    try {
      const response = await databases.getDocument(
        config.databaseId,
        config.userProjectsQuizId,
        id
      );
      return response as Quiz;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getQuiz = async (id: string): Promise<QuizData | null> => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.QuizQuestionId,
        [Query.equal("quiz_id", id)]
      );
      return response as QuizData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleProjectDp = async (fileId: string) => {
    const result = await storage.getFilePreview(
      config.projectProfilebucketId, // bucketId
      fileId // fileId
    );
    return result;
  };

  return {
    getUserData,
    getAllProjects,
    getUserProjects,
    getProjectQuiz,
    getQuizData,
    getQuiz,
    handleProjectDp,
  };
};
