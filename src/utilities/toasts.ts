// Source Imports
import Toast, {  } from "react-native-toast-message";
import { Achievement } from "../interfaces/Achievements";
import MoodObject from "../interfaces/Mood";
import { AppProps } from "../interfaces/Props";
import Supplement from "../interfaces/Supplement";

export const showAddToast = (item: Supplement, daySelected: string) => {
    Toast.show({
        type: "success",
        text1: `Added ${item.name} to ${daySelected} ✅`,
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

export const showAchievementToast = (item: Achievement, setModalVisible: AppProps["setModalVisible"]) => {
    Toast.show({
        type: "tomatoToast",
        text1: "🎉 Achievement Complete 🎉",
        text2: `${item.name}`,
        visibilityTime: 5000,
        onPress: () => setModalVisible({ modal: "achievements-modal" }),
        // And I can pass any custom props I want
        props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70", 
            spider: item.description === "Create a note for an individual supplement." ? true : false }
    });
};
