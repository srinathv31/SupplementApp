// Source Imports
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SupplementObject } from "../../interfaces/Supplement";
import IconI from "react-native-vector-icons/Ionicons";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";

export default function VerifySupplementStatusModal({ supplementsToUpdateStatus, setSupplementsToUpdateStatus }: {
    supplementsToUpdateStatus: SupplementObject[], setSupplementsToUpdateStatus: (s: SupplementObject[]) => void
}): JSX.Element {
    const { setUserData, userData } = useContext(allPropsContext);

    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }));
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const daySelected = useClientStore(state => state.daySelected);

    const ExitButtons = [
        { name: "Submit", color: "#36D1DC", function: () => handleSubmit() },
        { name: "Don't Change Taken Status", color: "red", function: () => handleExit() },
    ];

    function handleButtonPress(item: SupplementObject, status: "not-taken" | "missed" | "taken-off-time" | "taken-on-time") {
        const supplementMapCopy = { ...supplementMap };

        Object.values(supplementMapCopy[daySelected].SupplementSchedule).forEach(supplement => {
            if (supplement === item) {
                supplement.taken === status 
                    ? (supplement.taken = "not-taken", item.taken = "not-taken")
                    : (supplement.taken = status, item.taken = status);
            }
        });

        setSupplementsToUpdateStatus(supplementsToUpdateStatus);
        saveUserData(userData, setUserData, supplementMapCopy);
        setUserData(userData);

        updateSupplementMap(supplementMapCopy);
    }

    function handleSubmit() {
        const supplementsToUpdateStatusCopy = [...supplementsToUpdateStatus];

        Object.values(supplementsToUpdateStatusCopy).forEach((supplement, index) => {
            if (supplement.taken !== "taken-off-time") {
                supplementsToUpdateStatusCopy.splice(index,1);
            }
        });
        setSupplementsToUpdateStatus(supplementsToUpdateStatusCopy);
        updateModalVisible("hide-modal");
    }

    function handleExit() {
        const supplementsToUpdateStatusCopy = [...supplementsToUpdateStatus];

        Object.values(supplementsToUpdateStatusCopy).forEach(supplement => {
            supplement.taken = "not-taken";
        });
        setSupplementsToUpdateStatus(supplementsToUpdateStatusCopy);
        updateModalVisible("hide-modal");
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "status-check-modal" ? true : false}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={[styles.ListName, { textAlign: "center" }]}>{daySelected}</Text>
                    <Text style={[styles.ListName, { textAlign: "center" }]}>{"\nDid you take these supplements today?"}</Text>
                    <FlatList
                        data={supplementsToUpdateStatus}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <View key={index}>
                                    <View style={styles.ListItem}>
                                        <IconI onPress={() => handleButtonPress(item, "taken-on-time")}
                                            name={item.taken === "taken-on-time" ? "checkmark-circle" : "checkmark-circle-outline"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
                                        <IconI onPress={() => handleButtonPress(item, "taken-off-time")}
                                            name={item.taken === "taken-off-time" ? "checkmark-circle" : "checkmark-circle-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}></IconI>
                                        <IconI onPress={() => handleButtonPress(item, "missed")}
                                            name={item.taken === "missed" ? "close-circle" : "close-circle-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
                                        <Text style={styles.ListName}>
                                            {item.time !== "" && item.time+": "}
                                        </Text> 
                                        <Text style={styles.ListName}>
                                            {item.Supplement.name.length > 12 ? `${item.Supplement.name.substring(0,10)}...` : item.Supplement.name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    ></FlatList>
                    <FlatList
                        data={ExitButtons}
                        renderItem={({ item, index }) => {
                            return(
                                <View style={styles.button}>
                                    <TouchableOpacity key={index} onPress={item.function}>
                                        <Text
                                            style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    ></FlatList>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    modalView: {
        width: "85%", padding: 20,
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
    },
    button: {
        backgroundColor: "#112442", 
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: "95%",
        alignSelf: "center"
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
    },
    ListItem: {
        fontSize: 24,
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "white"
    },
    ListName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#EEE"
    },
    IconPadding: {
        padding: 1,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    }
});

