import { PageType } from "./AppTypes";
import { SupplementMapObject } from "./Supplement";
import User from "./User";
import { WeekDay } from "./WeekDay";

export interface AppProps extends GlobalProps {
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    setWeek: (w: WeekDay[]) => void,
    week: WeekDay[],
    setMonthText: (m: string) => void,
    monthText: string,
}

export interface GlobalProps {
    setUserData: (u: User) => void,
    userData: User,
    setPage: (p: PageType) => void,
    page: PageType,
}
