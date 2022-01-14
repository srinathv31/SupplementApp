// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { AppProps } from "../../interfaces/Props";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";

export default function MoodSlider({ setUserData, userData, setModalVisible, modalVisible, mood, supplementMap, setSupplementMap, daySelected, selectedDates }: AppProps): JSX.Element {
    const [rangeValue, setRangeValue] = useState<number>(0);
    
    function handleSlider() {
        const supplementMapCopy = { ...supplementMap };

        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: { mood: "", range: 0 } };
        }

        supplementMapCopy[daySelected].DailyMood = { mood: mood, range: rangeValue };

        setSupplementMap(supplementMapCopy);
        saveUserData(userData, setUserData, supplementMapCopy, selectedDates);

        setModalVisible({ modal: "hide-modal" });
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "mood-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose Intensity for {mood}</Text>
                    <Text style={styles.modalText}>Intensity: {rangeValue}</Text>
                    <Slider
                        style={{ width: "100%", height: 70 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#2196F3"
                        maximumTrackTintColor="#FFFFFF"
                        tapToSeek
                        onValueChange={setRangeValue}
                        value={rangeValue}
                        step={1}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleSlider()}
                    >
                        <Text style={styles.textStyle}>Set Mood</Text>
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
        marginTop: "60%" 
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
    }
});
