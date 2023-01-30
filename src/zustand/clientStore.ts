import create from "zustand";
import { devtools } from "zustand/middleware";
import { Achievement, ListOfAchievements } from "../interfaces/Achievements";
import { ModalType } from "../interfaces/AppTypes";
import getCurrentDate, { generateCurrentDateObject, initializeMonth, initializeWeek } from "../utilities/getCurrentDate";
import { SupplementMapObject, SupplementObject } from "../interfaces/Supplement";
import { selectedSupplementDefaultValue } from "../interfaces/DefaultValues";
import { DateData } from "react-native-calendars/src/types";
import { WeekDay } from "../interfaces/WeekDay";

export interface ClientState {
    index: number;
    updateIndex: (newIdx: number) => void;
    showButtons: boolean,
    updateShowButtons: (status: boolean) => void,
    multipleAddMode: boolean,
    updateMultipleAddMode: (status: boolean) => void,
    modalVisible: ModalType,
    updateModalVisible: (modal: ModalType) => void,
    swipeAnimation: string,
    updateSwipeAnimation: (anim: string) => void,
    mood: string,
    updateMood: (newMood: string) => void,
    daySelected: string,
    updateDaySelected: (dayStr: string) => void,
    completedAchievements: Achievement[],
    updatedCompletedAchievements: (ach: Achievement[]) => void,
    selectedSupplement: SupplementObject,
    updateSelectedSupplement: (supp: SupplementObject) => void,
    objDaySelected: DateData,
    updateObjDaySelected: (dateObj: DateData) => void,
    week: WeekDay[],
    updateWeek: (newWeek: WeekDay[]) => void,
    monthText: string,
    updateMonthText: (newMonth: string) => void,
    supplementMap: Record<string, SupplementMapObject>,
    updateSupplementMap: (map: Record<string, SupplementMapObject>) => void
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
            updateDaySelected: (dayStr) => set({ daySelected: dayStr }),
            completedAchievements: ListOfAchievements,
            updatedCompletedAchievements: (ach) => set({ completedAchievements: ach }),
            selectedSupplement: selectedSupplementDefaultValue,
            updateSelectedSupplement: (supp) => set({ selectedSupplement: supp }),
            objDaySelected: generateCurrentDateObject(),
            updateObjDaySelected: (dateObj) => set({ objDaySelected: dateObj }),
            week: initializeWeek(),
            updateWeek: (newWeek) => set({ week: newWeek }),
            monthText: initializeMonth(),
            updateMonthText: (newMonth) => set({ monthText: newMonth }),
            supplementMap: {},
            updateSupplementMap: (map) => set({ supplementMap: map })
        }),
        {
            name: "client-storage",
        },
    ),
);

export default useClientStore;