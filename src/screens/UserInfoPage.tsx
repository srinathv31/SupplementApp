// Source Imports
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Divider from "../components/Design/Divider";
import { AppProps } from "../interfaces/Props";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { saveUserToPhone } from "../utilities/saveLoadFunctions/saveUserData";
import StatsBoxes from "../components/User/StatsBoxes";
import SettingsList from "../components/User/SettingsList";
import { generateGreeting } from "../utilities/generateTimeGreetings";

export default function UserInfoPage({ userData, modalVisible, setModalVisible, setUserData, setPage }: AppProps): JSX.Element {
    
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
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Are You Sure You Want to Erase All Data?",
            "This cannot be undone",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Delete All Data", onPress: () => clearEntirePlan(),
                    style: "destructive"
                }
            ]
        );

    return(
        <Modal
            animationIn={"fadeIn"}
            animationOut={"slideOutDown"}
            isVisible={modalVisible.modal === "user-modal" ? true : false}
            onBackdropPress={() => setModalVisible({ modal: "hide-modal" })}
            useNativeDriver
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
                        <Icon
                            style={{ padding: 5 }}
                            onPress={() => setModalVisible({ modal: "hide-modal" })}
                            name="person-circle-outline" size={80} color="white"
                        />
                        <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>Change Profile Picture</Text>
                        <Divider length="small"></Divider>
                        <StatsBoxes
                            userData={userData}
                        ></StatsBoxes>
                        <SettingsList
                            setPage={setPage}
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
