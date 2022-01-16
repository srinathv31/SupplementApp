// Source Imports
import Toast from "react-native-toast-message";
import MoodObject from "../interfaces/Mood";
import Supplement from "../interfaces/Supplement";

export const showAddToast = (item: Supplement, daySelected: string) => {
    Toast.show({
        type: "success",
        text1: `Added ${item.name} to ${daySelected}`,
        visibilityTime: 4000
    });
};

export const showMoodToast = (mood: MoodObject) => {
    Toast.show({
        type: "info",
        text1: mood.mood !== "" ? `Selected Mood for today ${mood.mood}: ${mood.range}` : "No Mood Selected for Today",
        visibilityTime: 3000,
    });
};
