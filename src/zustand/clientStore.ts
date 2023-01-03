import create from "zustand";
import { devtools } from "zustand/middleware";

interface ClientState {
  index: number;
  updateIndex: (newIdx: number) => void;
  showButtons: boolean,
  updateShowButtons: (status: boolean) => void,
  multipleAddMode: boolean,
  updateMultipleAddMode: (status: boolean) => void
}

const useClientStore = create<ClientState>()(
    devtools(
        set => ({
            index: 1,
            updateIndex: newIdx => set(() => ({ index: newIdx })),
            showButtons: false,
            updateShowButtons: (status) => set(() => ({ showButtons: status })),
            multipleAddMode: false,
            updateMultipleAddMode: (status) => set(() => ({ multipleAddMode: status }))
        }),
        {
            name: "client-storage",
        },
    ),
);

export default useClientStore;
