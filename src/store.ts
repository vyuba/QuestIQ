import { create } from "zustand";
import { type Models } from "appwrite";
import { User } from "lucide-react";
import { ProfileOp } from "./components/Navbar";

interface User extends Models.User<Models.Preferences> {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password?: string;
  hash?: string;
  hashOptions?: object;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Models.Preferences;
  targets: Models.Target[];
  accessedAt: string;
}

interface Session extends Models.Token {
  $id: string;
  $createdAt: string;
  userId: string;
  secret: string;
  expire: string;
  phrase: string;
}

interface UserState {
  user: User | null;
  session: Session | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  setUserSession: (session: Models.Token) => void;
}

const useUser = create<UserState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setUserSession: (session) => set({ session }),
  resetUser: () => set({ user: null, session: null }),
}));

interface UserProfile {
  profile: null | ProfileOp;
  setProfile: (profile: UserProfile["profile"]) => void;
  reserProfile: () => void;
}

const useProfile = create<UserProfile>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  reserProfile: () => set({ profile: null }),
}));

export { useUser, User, type UserState, useProfile };
