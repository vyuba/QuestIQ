import { create } from "zustand";
import { type Models } from "appwrite";

interface UserProject {
  currentProject: { UserProjects: Models.Document[] } | undefined | null;
  setCurrentProject: (
    currentProject: { UserProjects: Models.Document[] } | undefined
  ) => void;
}

const useProject = create<UserProject>((set) => ({
  currentProject: null,
  setCurrentProject: (currentProject) => set({ currentProject }),
}));

export { useProject };
