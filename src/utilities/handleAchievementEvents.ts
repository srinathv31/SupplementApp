import { Achievement } from "../interfaces/Achievements";
import { AppProps } from "../interfaces/Props";
import { showAchievementToast } from "./toasts";

export function achievementUnlocked(completedAchievements: AppProps["completedAchievements"], setCompletedAchievements: AppProps["setCompletedAchievements"], 
    setModalVisible: AppProps["setModalVisible"], index: number) {
    const completedAchievementsCopy: Achievement[] = [];

    completedAchievements.forEach(item => {
        completedAchievementsCopy.push(item);
    });

    completedAchievementsCopy[0].color === "white" ? completedAchievementsCopy[index].color = "skyblue" : completedAchievementsCopy[index].color = "white";
    setTimeout(() => showAchievementToast(completedAchievementsCopy[index], setModalVisible), 1000);
    setCompletedAchievements(completedAchievementsCopy);
}
