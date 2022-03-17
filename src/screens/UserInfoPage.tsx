// Source Imports
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, Modal } from "react-native";
import Divider from "../components/Design/Divider";
import { AppProps } from "../interfaces/Props";
import Icon from "react-native-vector-icons/Ionicons";
import StatsBoxes from "../components/User/StatsBoxes";
import SettingsList from "../components/User/SettingsList";
import { generateGreeting } from "../utilities/generateTimeGreetings";
import ProfilePictureList from "../components/User/ProfilePictureList";
import CustomToast from "../components/Toast/customToast";

export default function UserInfoPage({ userData, modalVisible, setModalVisible, setUserData, setPage, setCompletedAchievements, completedAchievements }: AppProps): JSX.Element {
    const [changePictureMode, setChangePictureMode] = useState<boolean>(false);

    const pictureProps = { setUserData, userData, setChangePictureMode, completedAchievements, setCompletedAchievements, setModalVisible };

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
                    text: "Change Name", onPress: () => setModalVisible({ modal: "edit-name" }),
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
                        {!changePictureMode ? 
                            <View style={{ borderRadius: 30, overflow: "hidden" }}>
                                <Image source={{ uri: userData.picture }} style={{ width: 80, height: 80 }}></Image>
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
                            setUserData={setUserData}
                            userData={userData}
                        ></SettingsList>
                    </View>
                </View>
            </View>
            <CustomToast />
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
