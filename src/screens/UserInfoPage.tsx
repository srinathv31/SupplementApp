// Source Imports
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Image, Modal } from "react-native";
import Divider from "../components/Design/Divider";
import { AppProps } from "../interfaces/Props";
import Icon from "react-native-vector-icons/Ionicons";
import { saveUserToPhone } from "../utilities/saveLoadFunctions/saveUserData";
import StatsBoxes from "../components/User/StatsBoxes";
import SettingsList from "../components/User/SettingsList";
import { generateGreeting } from "../utilities/generateTimeGreetings";
import ProfilePictureList from "../components/User/ProfilePictureList";
import { achievementUnlocked } from "../utilities/handleAchievementEvents";
import { ListOfAchievements } from "../interfaces/Achievements";

export default function UserInfoPage({ userData, modalVisible, setModalVisible, setUserData, setPage, setCompletedAchievements, completedAchievements }: AppProps): JSX.Element {
    const [changePictureMode, setChangePictureMode] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = useState({ url: require("../assets/images/pitbull.jpg") });

    const pictureProps = { setUserData, userData, setChangePictureMode, completedAchievements, setCompletedAchievements, setModalVisible };

    useEffect(() => {
        const profilePictureCopy = { ...profilePicture };
        switch (userData.picture){
        case "../assets/images/pitbull.jpg":
            profilePictureCopy.url = require("../assets/images/pitbull.jpg");
            break;
        case "../assets/images/husky.jpg":
            profilePictureCopy.url = require("../assets/images/husky.jpg");
            break;
        case "../assets/images/trippy_astronaut.png":
            profilePictureCopy.url = require("../assets/images/trippy_astronaut.png");
            break;
        }
        setProfilePicture(profilePictureCopy);
    }, [userData]);

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
            achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 8);
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

    const createSettingsButtonAlert = () => {
        if (changePictureMode === true) {
            setChangePictureMode(false);
            return;
        }
        Alert.alert(
            "What Would You Lke to Change?",
            "",
            [
                {
                    text: "Change Profile Picture",
                    onPress: () => setChangePictureMode(true),
                    style: "default"
                },
                { 
                    text: "Change Name", onPress: () => console.log("NAME"),
                    style: "default"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ]
        );
    };

    const createDataButtonAlert = () => {
        Alert.alert(
            "Are You Sure You Want to Reset All Data?",
            "This will reset EVERYTHING. It cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "DELETE ALL DATA", onPress: () => (clearEntirePlan(), deleteAchievements()),
                    style: "destructive"
                }
            ]
        );
    };

    function deleteAchievements() {
        const userCopy = { ...userData };

        userCopy.achievements = [];
        setUserData(userCopy);

        setCompletedAchievements(ListOfAchievements);
        saveUserToPhone(userCopy);
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "user-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
            style={{ flex: 1 }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: 10, flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Icon
                                style={{ padding: 5, margin: 0 }}
                                onPress={() => setModalVisible({ modal: "hide-modal" })}
                                name="close-outline" size={30} color="white"
                            />
                        </View>
                        <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>{`${generateGreeting()}${userData.name}`}</Text>
                        {!changePictureMode ? <View style={{ borderRadius: 30, overflow: "hidden" }}>
                            <Image source={profilePicture.url} style={{ width: 80, height: 80 }}></Image>
                        </View> :
                            <ProfilePictureList {...pictureProps}></ProfilePictureList>}
                        <Icon onPress={() => createSettingsButtonAlert()}
                            name="options-outline" style={{ padding: 10 }} size={25} color="white"></Icon>
                        <Divider length="small"></Divider>
                        <StatsBoxes
                            userData={userData}
                        ></StatsBoxes>
                        <SettingsList
                            setPage={setPage}
                            setModalVisible={setModalVisible}
                            setCompletedAchievements={setCompletedAchievements}
                            completedAchievements={completedAchievements}
                        ></SettingsList>
                        <View style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                            <Pressable onPress={() => createTwoButtonAlert()} style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? "#111f36"
                                        : "#112442"
                                }
                            ]}>
                                <Text style={{ color: "crimson", fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>Erase Entire Plan</Text>
                            </Pressable>
                        </View>
                        <View style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                            <Pressable onPress={() => createDataButtonAlert()} style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? "#111f36"
                                        : "#112442"
                                }
                            ]}>
                                <Text style={{ color: "crimson", fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>Reset All Data</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    modalView: {
        width: "100%", padding: 10,
        height: "95%",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        overflow: "hidden"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center",
        marginTop: "0%"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
