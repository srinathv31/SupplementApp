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

        // TODO: Use immer method
        // * Converting the mood object from the legacy to new mood object
        const fixedLocalData = { ...parsedJsonValue };
        Object.entries(fixedLocalData.data.supplementMap).forEach(([key, supplementObj]) => {
        // If DailyWater object doesn't exist, that means we have to set the new water object manually
            if (!supplementObj.DailyWater) {
                fixedLocalData.data.supplementMap[key].DailyWater = { completed: 0, goal: 2000 };
            }
            if (Object.keys(supplementObj.DailyMood).some(moodKey => ["1", "2", "3"].includes(moodKey))) {
                fixedLocalData.data.supplementMap[key].DailyMood = {};
            }
        });

        const adjustedSelectedDates = adjustSelectedDates(fixedLocalData.data.selectedDates);

        // Setting saved data to User useState
        userCopy.name = fixedLocalData.name;
        userCopy.lastName = fixedLocalData.lastName;
        userCopy.age = fixedLocalData.age;
        userCopy.premiumStatus = fixedLocalData.premiumStatus;
        userCopy.data.supplementMap = fixedLocalData.data.supplementMap;
        userCopy.data.selectedDates = { ...adjustedSelectedDates };
        userCopy.data.waterGoal = !fixedLocalData.data.waterGoal ? 2000 : fixedLocalData.data.waterGoal;
        userCopy.picture = !["dog", "mountain", "skyline" ].includes(fixedLocalData.picture) ? "dog" : fixedLocalData.picture;
        userCopy.achievements = fixedLocalData.achievements;

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
