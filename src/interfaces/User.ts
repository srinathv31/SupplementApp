import { Achievement } from "./Achievements";
import CalendarDotObject from "./Calendar";
import { SupplementMapObject } from "./Supplement";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface User {
    name: string,
    lastName: string,
    age: string,
    picture: string,
    data: {
        supplementMap: Record<string, SupplementMapObject>,
        selectedDates: CalendarDotObject,
        waterGoal: number,
        selectedUnits: "ml" | "oz",
    },
    premiumStatus: boolean,
    achievements: Achievement[],
    userAuthObj?: FirebaseAuthTypes.User,
}

export default User;
