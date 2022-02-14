import { DateData } from "react-native-calendars/src/types";
import ModalObject from "./Modal";
import { SupplementMapObject, SupplementObject } from "./Supplement";
import User from "./User";
import { WeekDay } from "./WeekDay";

export interface AppProps {
    setUserData: (u: User) => void,
    userData: User,
    setDaySelected: (d: string) => void,
    daySelected: string,
    setModalVisible: (j: ModalObject) => void,
    modalVisible: ModalObject,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    setObjDaySelected: (o: DateData) => void,
    objDaySelected: DateData,
    setShowButtons: (b: boolean) => void,
    showButtons: boolean,
    setIndex: (i: number) => void,
    index: number,
    setPrevIndex: (i: number) => void,
    prevIndex: number
    setJournalText: (j: string) => void,
    journalText: string,
    setWeek: (w: WeekDay[]) => void,
    week: WeekDay[],
    setMonthText: (m: string) => void,
    monthText: string,
    setSwipeAnimation: (s: string) => void,
    swipeAnimation: string,
    setSelectedSupplement: (s: SupplementObject) => void,
    selectedSupplement: SupplementObject,
    setMultipleAddMode: (m: boolean) => void,
    multipleAddMode: boolean,
    setMood: (m: string) => void,
    mood: string
}

