import User from "../../interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarDotObject from "../../interfaces/Calendar";
import { generateCurrentDateObject } from "../getCurrentDate";
import { saveDataToCloud } from "./saveDataToCloud";
import { ClientState } from "../../zustand/clientStore";

export const checkForSave = async (userData: ClientState["userData"]) => {
    const userCopy = { ...userData };
    try {
        const jsonValue = await AsyncStorage.getItem(""+userCopy.userAuthObj?.uid);

        if (!jsonValue) {
            return null;
        }

        console.log("Loading from local save");
        // Parsing saved data
        const parsedJsonValue = JSON.parse(jsonValue) as User;
        const adjustedSelectedDates = adjustSelectedDates(parsedJsonValue.data.selectedDates);

        // Setting saved data to User useState
        userCopy.name = parsedJsonValue.name;
        userCopy.lastName = parsedJsonValue.lastName;
        userCopy.age = parsedJsonValue.age;
        userCopy.premiumStatus = parsedJsonValue.premiumStatus;
        userCopy.data.supplementMap = parsedJsonValue.data.supplementMap;
        userCopy.data.selectedDates = { ...adjustedSelectedDates };
        userCopy.data.waterGoal = !parsedJsonValue.data.waterGoal ? 2000 : parsedJsonValue.data.waterGoal;
        userCopy.picture = parsedJsonValue.picture;
        userCopy.achievements = parsedJsonValue.achievements;

        saveDataToCloud(userCopy);

        return userCopy as User;
    } catch(e) {
        console.log(e);
        return null;
    }
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
        }
    });
    selectedDatesCopy[todayDate.dateString].selected = true;
    return selectedDatesCopy;

};

export const checkIfSaveExistsOnLocal = async (name: string) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if(value !== null) {
            return true;
        }
        return false;
    } catch(e) {
        // error reading value
    }
};
