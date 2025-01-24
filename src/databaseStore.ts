import { create } from "zustand";
import { type Models } from "appwrite";

// interface Database extends Models.DocumentList<Models.Document> {
//   total: number | null;
//   documents: Document[];
//   [key: string]: any;
//   $id: string;
//   $collectionId: string;
//   $databaseId: string;
//   $createdAt: string;
//   $updatedAt: string;
//   $permissions: string[];
// }

interface UserQuiz {
  UserQuizDatabase: Models.Document[] | undefined | null;
  setUserQuizDatabase: (
    UserQuizDatabase: Models.Document[] | undefined
  ) => void;
}

const useDatabase = create<UserQuiz>((set) => ({
  UserQuizDatabase: null,
  setUserQuizDatabase: (UserQuizDatabase) => set({ UserQuizDatabase }),
}));

export { useDatabase };
