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

interface UserProject {
  currentProject: Models.Document[] | undefined | null;
  setCurrentProject: (currentProject: Models.Document[] | undefined) => void;
}

const useProject = create<UserProject>((set) => ({
  currentProject: null,
  setCurrentProject: (currentProject) => set({ currentProject }),
}));

export { useProject };
