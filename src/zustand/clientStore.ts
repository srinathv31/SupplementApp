import create from "zustand";
import { devtools } from "zustand/middleware";

interface ClientState {
  index: number;
  updateIndex: (newIdx: number) => void;
}

const useClientStore = create<ClientState>()(
    devtools(
        set => ({
            index: 1,
            updateIndex: newIdx => set(() => ({ index: newIdx })),
        }),
        {
            name: "client-storage",
        },
    ),
);

export default useClientStore;
