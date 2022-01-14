import { DateData } from "react-native-calendars/src/types";
import CalendarDotObject from "./Calendar";
import ModalObject from "./Modal";
import { SupplementMapObject, SupplementObject } from "./Supplement";
import User from "./User";
import { WeekDay } from "./WeekDay";

export interface WeekProps {
    setWeek: (w: WeekDay[]) => void,
    week: WeekDay[],
    setMonthText: (m: string) => void,
    setSwipeAnimation: (s: string) => void,
    daySelected: string,
    supplementMap: Record<string, SupplementMapObject>,
    setModalVisible: (j: ModalObject) => void,
    selectedSupplement: SupplementObject,
    setObjDaySelected: (o: DateData) => void,
    setDaySelected: (d: string) => void,
    setIndex: (i: number) => void,
    setSelectedSupplement: (s: SupplementObject) => void,
    setSelectedDates: (d: CalendarDotObject) => void,
    selectedDates: CalendarDotObject,
    setShowStatusButtons: (b: boolean) => void,
    showStatusButtons: boolean,
    setUserData: (u: User) => void,
    userData: User,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,

}
