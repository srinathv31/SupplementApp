import { SupplementMapObject } from "../../interfaces/Supplement";
import User from "../../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function saveUserData(userData: User, setUserData: (u: User) => void, supplementMap: Record<string, SupplementMapObject>) {
    const userCopy: User = { ...userData };
    
    userCopy.data.supplementMap = supplementMap;

    saveUserToPhone(userCopy);

    setUserData(userCopy);
}

export const saveUserToPhone = async (userData: User) => {
    try {
        //save user
        await AsyncStorage.setItem(""+userData.userAuthObj?.uid, JSON.stringify(userData));
    
    } catch (e) {
        console.log("Error: " + e);
    }
};

