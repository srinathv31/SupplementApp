// Source Imports
import React, { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ListOfAchievements } from "../../interfaces/Achievements";
import User from "../../interfaces/User";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import auth from "@react-native-firebase/auth";
import { removeLoggedInKey } from "../../utilities/saveLoadFunctions/updateIsLoggedIn";
import { penguinPic } from "../../assets/imageURLs/profilePictureURLs";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";
import { openComposer } from "react-native-email-link";
import { shareEntirePlan } from "../../utilities/shareFunctions";
import { FlatList } from "react-native-gesture-handler";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";

export default function SettingsList(): JSX.Element {
    const { setPage, userData, setUserData } = useContext(allPropsContext);

    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow); 

    const SettingButtons = [
        { name: "Achievements", color: "white", function: () => openAchievementPage() },
        { name: "Help", color: "white", function: () => createHelpAlert() },
        { name: "Log Out", color: "crimson", function: () => createLogOutAlert() },
        { name: "Contact Us 😁: happysvstudio@gmail.com", color: "white", function: () => sendEmail() },
        { name: "Share Your Entire Schedule (CSV/Excel)", color: "#36D1DC", function: () => shareEntirePlan(userData.data.supplementMap) },
        { name: "Erase Entire Plan", color: "crimson", function: () => createTwoButtonAlert() },
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
        Alert.alert(
            "Do You Wish to Start the Walkthrough Tutorial?",
            "",
            [
                {
                    text: "Continue",
                    onPress: () => {
                        setPage("onboarding-screen");
                        if(completedAchievements[4].color === "white"){
                            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 4);
                        }
                    },
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
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 7);
        }
        updateModalVisible("achievements-modal");
    };

    function userSignOut() {
        const userCopy: User = {
            name: "",
            lastName: "",
            age: "",
            picture: penguinPic,
            data: {
                supplementMap: {},
                selectedDates: {}
            },
            premiumStatus: true,
            achievements: ListOfAchievements
        };
        setPage("login-screen");
        setUserData(userCopy);
        auth().signOut().then(() => console.log("Signed Out!"));
        removeLoggedInKey();
    }

    function clearEntirePlan() {
        const userCopy = { ...userData };

        Object.keys(userCopy.data.supplementMap).forEach(date => {
            delete userCopy.data.supplementMap[date];
        });
        Object.keys(userCopy.data.selectedDates).forEach(date => {
            delete userCopy.data.selectedDates[date];
        });

        setUserData(userCopy);
        saveUserToPhone(userCopy);

        if (completedAchievements[8].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 8);
        }
    }

    const createTwoButtonAlert = () => {
        Alert.alert(
            "Are You Sure You Want to Erase Your Entire Plan?",
            "This cannot be undone",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Erase Entire Plan", onPress: () => clearEntirePlan(),
                    style: "destructive"
                }
            ]
        );
    };

    function sendEmail() {
        openComposer({
            to: "happysvstudio@gmail.com",
            subject: "Hey Dev Team!"
        });
    }

    return(
        <View style={{ flex: 1, width: "100%" }}>
            <FlatList
                data={SettingButtons}
                renderItem={({ item, index }) => {
                    return(
                        <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "95%" }}>
                            <TouchableOpacity onPress={item.function}>
                                <Text
                                    style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            ></FlatList>
        </View>
    );
}
