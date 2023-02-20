import { Alert } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import User from "../interfaces/User";
import { ClientState } from "../zustand/clientStore";
import saveUserData from "./saveLoadFunctions/saveUserData";

export function clearMoods({ userData, supplementMap, daySelected, updateUserData, updateSupplementMap, updateModalVisible, objDaySelected }: Partial<ClientState>) {
    if (!userData || !supplementMap || !daySelected || !updateUserData || !updateSupplementMap || !updateModalVisible || !objDaySelected ) {
        return;
    }

    Alert.alert(
        `Erase All Moods for ${daySelected}?`,
        "This cannot be undone",
        [
            {
                text: "Don't Change Moods",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { 
                text: "Erase All Moods", onPress: () => clearAllMood({ userData, supplementMap, daySelected, updateUserData, updateSupplementMap, updateModalVisible, objDaySelected }),
                style: "destructive"
            }
        ]
    );
}

function clearAllMood({ userData, supplementMap, daySelected, updateUserData, updateSupplementMap, updateModalVisible, objDaySelected }: Partial<ClientState>) {
    if (!userData || !supplementMap || !daySelected || !updateUserData || !updateSupplementMap || !updateModalVisible || !objDaySelected ) {
        console.log("oops");
        return;
    }

    const userCopy = { ...userData };
    const supplementMapCopy = { ...supplementMap };

    supplementMapCopy[daySelected].DailyMood = {};

    // Deleting Empty Date
    userCopy.data.selectedDates = removeDate(userData, objDaySelected, supplementMapCopy, daySelected);
    if (supplementMapCopy[daySelected].SupplementSchedule.length === 0 && supplementMapCopy[daySelected].JournalEntry === "" && Object.keys(supplementMapCopy[daySelected].DailyMood).length === 0 ){
        delete supplementMapCopy[daySelected];
    }

    updateUserData(userCopy);
    updateSupplementMap(supplementMapCopy);
    saveUserData(userCopy, updateUserData, supplementMapCopy);

    updateModalVisible("hide-modal");
}

function removeDate(userData: User, day: DateData, supplementMap: ClientState["supplementMap"], daySelected: string){
    const selectedDatesCopy = { ...userData.data.selectedDates };
    const stringDate = day.dateString;
    if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 0){
        selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "moodCheck") as [{key: string, color: string}];
    }
    return selectedDatesCopy;
}
