import User from "../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProps } from "../interfaces/Props";
// import CalendarDotObject from "../interfaces/Calendar";

export const checkForSave = async ({ userData, setSupplementMap, setSelectedDates }: AppProps) => {
    const userCopy = { ...userData };
    try {
        const jsonValue = await AsyncStorage.getItem(userCopy.name);
        
        if (jsonValue != null) {
            const parsedJsonValue = JSON.parse(jsonValue) as User;
            setSupplementMap(parsedJsonValue.data.supplementMap);
            setSelectedDates(parsedJsonValue.data.selectedDates);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
    
    console.log("Done.");
};

