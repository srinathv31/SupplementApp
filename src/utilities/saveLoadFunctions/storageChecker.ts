import User from "../../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProps } from "../../interfaces/Props";
import CalendarDotObject from "../../interfaces/Calendar";
import { generateCurrentDateObject } from "../getCurrentDate";

export const checkForSave = async ({ userData, setUserData, setSupplementMap }: AppProps) => {
    const userCopy = { ...userData };
    try {
        const jsonValue = await AsyncStorage.getItem(userCopy.name);
        
        if (jsonValue != null) {
            // Parsing saved data
            const parsedJsonValue = JSON.parse(jsonValue) as User;
            const adjustedSelectedDates = adjustSelectedDates(parsedJsonValue.data.selectedDates);

            // Setting saved data to User useState
            userCopy.data.supplementMap = parsedJsonValue.data.supplementMap;
            userCopy.data.selectedDates = adjustedSelectedDates;
            setUserData(userCopy);

            setSupplementMap(parsedJsonValue.data.supplementMap);
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
    
    console.log("Done.");
};

const adjustSelectedDates = (selectedDates: CalendarDotObject) => {
    const selectedDatesCopy = { ...selectedDates };

    const todayDate = generateCurrentDateObject();

    if(!Object.keys(selectedDatesCopy).includes(todayDate.dateString)) {
        selectedDatesCopy[todayDate.dateString] = { dots: [{ key: "", color: "" }], selected: true };
    }

    Object.keys(selectedDatesCopy).forEach(date => {
        if (date !== todayDate.dateString) {
            selectedDatesCopy[date].selected = false;
        } else {
            selectedDatesCopy[date].selected = true;
        }
    });
    return selectedDatesCopy;

};
