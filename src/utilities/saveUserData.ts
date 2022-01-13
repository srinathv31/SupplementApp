import CalendarDotObject from "../interfaces/Calendar";
import { SupplementMapObject } from "../interfaces/Supplement";
import User from "../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function saveUserData(userData: User, setUserData: (u: User) => void, supplementMap: Record<string, SupplementMapObject>, selectedDates: CalendarDotObject) {
    const userCopy = { ...userData };

    userCopy.data.supplementMap = supplementMap;
    userCopy.data.selectedDates = selectedDates;

    saveUserToPhone(userCopy);

    setUserData(userCopy);
}

const saveUserToPhone = async (userData: User) => {
    try {
        //save user
        await AsyncStorage.setItem(userData.name, JSON.stringify(userData));
    
    } catch (e) {
        console.log("Error: " + e);
    }
    // removeValue(userData);
};

const removeValue = async (userData: User) => {
    try {
        await AsyncStorage.removeItem(userData.name);
    } catch(e) {
        // remove error
    }
    console.log("Done.");
};

