import User from "../../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppProps } from "../../interfaces/Props";
import CalendarDotObject from "../../interfaces/Calendar";
import { generateCurrentDateObject } from "../getCurrentDate";

export const checkForSave = async ({ userData, setSupplementMap, setSelectedDates }: AppProps) => {
    const userCopy = { ...userData };
    try {
        const jsonValue = await AsyncStorage.getItem(userCopy.name);
        
        if (jsonValue != null) {
            const parsedJsonValue = JSON.parse(jsonValue) as User;
            const adjustedSelectedDates = adjustSelectedDates(parsedJsonValue.data.selectedDates);

            setSupplementMap(parsedJsonValue.data.supplementMap);
            setSelectedDates(adjustedSelectedDates);
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
