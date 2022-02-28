import CalendarDotObject from "./Calendar";
import { SupplementMapObject } from "./Supplement";

interface User {
    name: string,
    age: number,
    picture: string,
    data: {
        supplementMap: Record<string, SupplementMapObject>,
        selectedDates: CalendarDotObject,
    },
    premiumStatus: boolean,
    isLoggedIn: boolean
}

export default User;
