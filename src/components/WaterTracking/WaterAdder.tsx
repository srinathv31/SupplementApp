// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";
import IconM from "react-native-vector-icons/MaterialIcons";
import shallow from "zustand/shallow";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function WaterAdder(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const daySelected = useClientStore(state => state.daySelected);

    const [rangeValue, setRangeValue] = useState<number>(10);
    
    function handleSlider() {
        const supplementMapCopy = { ...supplementMap };
        const userCopy = { ...userData };

        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: {}, DailyWater: { completed: 0, goal: userData.data.waterGoal } };
        }

        // Add Water to SupplementMap
        supplementMapCopy[daySelected].DailyWater.completed = supplementMapCopy[daySelected].DailyWater.completed + rangeValue;
        userCopy.data.supplementMap = { ...supplementMapCopy };

        updateSupplementMap(supplementMapCopy);
        saveUserData(userCopy, updateUserData, supplementMapCopy);
        updateUserData(userCopy);

        updateModalVisible("hide-modal");
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "water-modal"}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => updateModalVisible("hide-modal")} style={styles.icon}>
                        <IconM name="cancel" size={20} color="white" />
                    </TouchableOpacity>
                    <View style={styles.graphWrapper}>
                        <AnimatedCircularProgress
                            size={200}
                            width={3}
                            backgroundWidth={30}
                            fill={(rangeValue/1000)*100}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                        >
                            {fill => <Text style={styles.points}>{Math.round((1000 * fill) / 100)}ml</Text>}
                        </AnimatedCircularProgress>
                    </View>
                    <Slider
                        style={{ width: "100%", height: 70 }}
                        minimumValue={10}
                        maximumValue={1000}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#FFFFFF"
                        tapToSeek
                        onValueChange={setRangeValue}
                        value={rangeValue}
                        step={10}
                        vertical={true}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSlider()}
                    >
                        <Text style={styles.textStyle}>Add Water</Text>
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
    }
});
