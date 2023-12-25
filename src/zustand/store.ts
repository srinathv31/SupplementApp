import { create } from "zustand";

interface BearState {
  user: { uid: string; email: string; displayName: string };
  updateUser: (user: {
    uid: string;
    email: string;
    displayName: string;
  }) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  user: { uid: "none", email: "none", displayName: "none" },
  updateUser: (uid) => set(() => ({ user: { ...uid } })),
}));
