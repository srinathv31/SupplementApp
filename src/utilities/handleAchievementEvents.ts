import { Achievement } from "../interfaces/Achievements";
import { AppProps } from "../interfaces/Props";
import { showAchievementToast } from "./toasts";

export function achievementUnlocked({ completedAchievements, setCompletedAchievements, setModalVisible }: {
    setCompletedAchievements: AppProps["setCompletedAchievements"], completedAchievements: AppProps["completedAchievements"],
    setModalVisible: AppProps["setModalVisible"]
}) {
    const completedAchievementsCopy: Achievement[] = [];

    completedAchievements.forEach(item => {
        completedAchievementsCopy.push(item);
    });

    completedAchievementsCopy[0].color === "white" ? completedAchievementsCopy[0].color = "skyblue" : completedAchievementsCopy[0].color = "white";
    showAchievementToast(completedAchievementsCopy[0], setModalVisible);
    setCompletedAchievements(completedAchievementsCopy);
}
