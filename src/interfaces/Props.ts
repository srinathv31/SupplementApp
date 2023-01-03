import { DateData } from "react-native-calendars/src/types";
import { Achievement } from "./Achievements";
import { ModalType, PageType } from "./AppTypes";
import { SupplementMapObject, SupplementObject } from "./Supplement";
import User from "./User";
import { WeekDay } from "./WeekDay";

export interface AppProps extends GlobalProps {
    setDaySelected: (d: string) => void,
    daySelected: string,
    setModalVisible: (j: ModalType) => void,
    modalVisible: ModalType,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    setObjDaySelected: (o: DateData) => void,
    objDaySelected: DateData,
    setWeek: (w: WeekDay[]) => void,
    week: WeekDay[],
    setMonthText: (m: string) => void,
    monthText: string,
    setSwipeAnimation: (s: string) => void,
    swipeAnimation: string,
    setSelectedSupplement: (s: SupplementObject) => void,
    selectedSupplement: SupplementObject,
    setMood: (m: string) => void,
    mood: string,
    setCompletedAchievements: (a: Achievement[]) => void,
    completedAchievements: Achievement[]
}

export interface GlobalProps {
    setUserData: (u: User) => void,
    userData: User,
    setPage: (p: PageType) => void,
    page: PageType,
}
