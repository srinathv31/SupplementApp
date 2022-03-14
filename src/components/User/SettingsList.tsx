// Source Imports
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { ListOfAchievements } from "../../interfaces/Achievements";
import { AppProps } from "../../interfaces/Props";
import User from "../../interfaces/User";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import auth from "@react-native-firebase/auth";
import { removeLoggedInKey } from "../../utilities/saveLoadFunctions/updateIsLoggedIn";

export default function SettingsList({ setPage, setModalVisible, setCompletedAchievements, completedAchievements, setUserData }: {
    setPage: AppProps["setPage"], setModalVisible: AppProps["setModalVisible"],
    setCompletedAchievements: AppProps["setCompletedAchievements"], completedAchievements: AppProps["completedAchievements"],
    setUserData: AppProps["setUserData"]
}): JSX.Element {

    const SettingButtons = [
        { name: "Achievements", color: "white", function: () => openAchievementPage() },
        { name: "Help", color: "white", function: () => createHelpAlert() },
        { name: "Log Out", color: "crimson", function: () => createLogOutAlert() }
    ];

    const createLogOutAlert = () => {
        Alert.alert(
            "Are You Sure You Want to Log Out?",
            "You can log back in anytime 😁",
            [
                { 
                    text: "Log Out", onPress: () => userSignOut(),
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

    const openAchievementPage = () => {
        if (completedAchievements[7].color === "white") {
            achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 7);
        }
        setModalVisible({ modal: "achievements-modal" });
    };

    function userSignOut() {
        const userCopy: User = {
            name: "",
            lastName: "",
            age: "",
            picture: "",
            data: {
                supplementMap: {},
                selectedDates: {}
            },
            premiumStatus: true,
            achievements: ListOfAchievements,
            uri: ""
        };
        setPage({ page: "login-screen" });
        setUserData(userCopy);
        auth().signOut().then(() => console.log("Signed Out!"));
        removeLoggedInKey();
    }

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
