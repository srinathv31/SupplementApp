import { string } from "prop-types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { ModalType } from "../interfaces/AppTypes";
import getCurrentDate, { grabMonth } from "../utilities/getCurrentDate";

export interface ClientState {
    index: number;
    updateIndex: (newIdx: number) => void;
    showButtons: boolean,
    updateShowButtons: (status: boolean) => void,
    multipleAddMode: boolean,
    updateMultipleAddMode: (status: boolean) => void,
    modalVisible: ModalType,
    updateModalVisible: (modal: ModalType) => void,
    //   monthText: string,
    //   setMonthText: (month: string) => void,
    swipeAnimation: string,
    updateSwipeAnimation: (anim: string) => void,
    mood: string,
    updateMood: (newMood: string) => void,
    daySelected: string,
    updateDaySelected: (dayStr: string) => void
}

const useClientStore = create<ClientState>()(
    devtools(
        set => ({
            index: 1,
            updateIndex: (newIdx) => set(() => ({ index: newIdx })),
            showButtons: false,
            updateShowButtons: (status) => set(() => ({ showButtons: status })),
            multipleAddMode: false,
            updateMultipleAddMode: (status) => set(() => ({ multipleAddMode: status })),
            modalVisible: "hide-modal",
            updateModalVisible: (modal) => set(() => ({ modalVisible: modal })),
            // monthText: grabMonth(week),
            // setMonthText: (month) => set(() => ({ monthText: month })),
            swipeAnimation: "fadeIn",
            updateSwipeAnimation: (anim) => set({ swipeAnimation: anim }),
            mood: "",
            updateMood: (newMood) => set({ mood: newMood }),
            daySelected: getCurrentDate(),
            updateDaySelected: (dayStr) => set({ daySelected: dayStr })
        }),
        {
            name: "client-storage",
        },
    ),
);

export default useClientStore;
