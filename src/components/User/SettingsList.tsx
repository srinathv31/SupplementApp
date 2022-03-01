// Source Imports
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";

export default function SettingsList({ setPage, setModalVisible, setCompletedAchievements, completedAchievements }: {
    setPage: AppProps["setPage"], setModalVisible: AppProps["setModalVisible"],
    setCompletedAchievements: AppProps["setCompletedAchievements"], completedAchievements: AppProps["completedAchievements"]
}): JSX.Element {

    const SettingButtons = [
        { name: "Achievements", color: "white", function: () => setModalVisible({ modal: "achievements-modal" }) },
        { name: "Help", color: "white", function: () => createHelpAlert() },
        { name: "Log Out", color: "crimson", function: () => createLogOutAlert() }
    ];

    const createLogOutAlert = () => {
        Alert.alert(
            "Are You Sure You Want to Log Out?",
            "You can log back in anytime 😁",
            [
                { 
                    text: "Log Out", onPress: () => setPage({ page: "login-screen" }),
                    style: "destructive"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ]
        );
    };

    const createHelpAlert = () => {
        if(completedAchievements[4].color === "white"){
            achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 4);
        }
        Alert.alert(
            "Do You Wish to Start the Walkthrough Tutorial?",
            "",
            [
                {
                    text: "Continue",
                    onPress: () => setPage({ page: "onboarding-screen" }),
                    style: "default"
                },
                { 
                    text: "Cancel", onPress: () => console.log("Pressed Cancel"),
                    style: "cancel"
                }
            ]
        );
    };

    return(
        <>
            {SettingButtons.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                        <Pressable>
                            <Text onPress={item.function}
                                style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                        </Pressable>
                    </View>
                );
            })}
        </>
    );
}
