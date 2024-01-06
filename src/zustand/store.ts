import { create } from "zustand";

interface ClientState {
  user: { uid: string; email: string; displayName: string };
  updateUser: (user: {
    uid: string;
    email: string;
    displayName: string;
  }) => void;
  index: number;
  updateIndex: (idx: number) => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  user: { uid: "none", email: "none", displayName: "none" },
  updateUser: (uid) => set(() => ({ user: { ...uid } })),
  index: 1,
  updateIndex: (idx) => set({ index: idx }),
}));
