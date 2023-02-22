// Source Imports
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";
import IconM from "react-native-vector-icons/MaterialIcons";
import shallow from "zustand/shallow";

export default function WaterResetter(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const daySelected = useClientStore(state => state.daySelected);

    const [waterGoalInput, setWaterGoalInput] = useState<string>("");

    function handleSubmit() {
        const supplementMapCopy = { ...supplementMap };
        const userCopy = { ...userData };

        const waterGoalInputNumber = +waterGoalInput > 10000 ? 10000 : +waterGoalInput;

        // update water daily water goal number
        userCopy.data.waterGoal = waterGoalInputNumber;

        // Add Water to SupplementMap
        if (supplementMap[daySelected]){
            supplementMapCopy[daySelected].DailyWater.goal = waterGoalInputNumber;
            userCopy.data.supplementMap = { ...supplementMapCopy };
        }

        updateSupplementMap(supplementMapCopy);
        saveUserData(userCopy, updateUserData, supplementMapCopy);
        updateUserData(userCopy);

        updateModalVisible("hide-modal");
    }

    useEffect(() => {
        if (+waterGoalInput < 10000) {
            return;
        }
        setWaterGoalInput("10000");
    }, [waterGoalInput]);

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "water-goal-modal"}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
            onDismiss={() => setWaterGoalInput("")}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => updateModalVisible("hide-modal")} style={styles.icon}>
                        <IconM name="cancel" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 24, textAlign: "center", fontWeight: "300" }}>{"Set Daily Water Goal"}</Text>
                    <View style={styles.bar}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: "#36D1DC" }]}
                            onChangeText={setWaterGoalInput}
                            value={waterGoalInput}
                            placeholder="Goal (ml)"
                            placeholderTextColor={"gray"}
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.textStyle}>Enter</Text>
                    </Pressable>
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
        width: "75%", padding: 10,
        paddingVertical: 30,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center"
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
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        color: "white",
    },
    points: {
        textAlign: "center",
        color: "#eee",
        fontSize: 40,
        fontWeight: "100",
    },
    icon: {
        position: "absolute",
        margin: "5%"
    },
    bar: {
        alignSelf: "center",
    },
    button1: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        padding: 10,
        paddingTop: 10,
        textAlign: "center",
        color: "white",
        fontSize: 23,
        fontWeight: "600"
    },
    input: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        borderColor: "#36D1DC",
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 10,
        color: "white"
    },
});
