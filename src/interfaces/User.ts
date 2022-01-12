import CalendarDotObject from "./Calendar";
import { SupplementMapObject } from "./Supplement";

interface User {
    name: string,
    age: number,
    data: {
        supplementMap: Record<string, SupplementMapObject>,
        selectedDates: CalendarDotObject,
    }
}

export default User;
