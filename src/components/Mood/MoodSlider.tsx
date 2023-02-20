// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { moodDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import { SupplementMapObject } from "../../interfaces/Supplement";
import User from "../../interfaces/User";
import { DateData } from "react-native-calendars/src/types";

export default function MoodSlider(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const mood = useClientStore(state => state.mood);
    const daySelected = useClientStore(state => state.daySelected);
    const objDaySelected = useClientStore(state => state.objDaySelected);

    const [rangeValue, setRangeValue] = useState<number>(1);
    
    function handleSlider() {
        const supplementMapCopy = { ...supplementMap };

        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: {} };
        }

        // Add Mood + Range
        supplementMapCopy[daySelected].DailyMood[mood] = { mood: mood, range: rangeValue, TimelineData: [] };

        // update calendar
        const userCopy = addDate(userData, objDaySelected, supplementMapCopy);

        updateSupplementMap(supplementMapCopy);
        saveUserData(userCopy, updateUserData, supplementMapCopy);
        updateUserData(userCopy);

        updateModalVisible("hide-modal");
    }

    function addDate(userData: User, day: DateData, supplementMap: Record<string, SupplementMapObject>) {
        const userCopy: User = { ...userData };
        const stringDate = day.dateString;
        
        if (Object.values(supplementMap[daySelected].DailyMood).length > 0){
            if (userCopy.data.selectedDates[stringDate] === undefined) {
                userCopy.data.selectedDates[stringDate] = { dots:[], selected: false };
            }
            if (userCopy.data.selectedDates[stringDate].dots.length === 0 || !userCopy.data.selectedDates[stringDate].dots.find(dot => dot.key === "moodCheck")){
                userCopy.data.selectedDates[stringDate].dots.push(moodDot);
            }
            userCopy.data.selectedDates[stringDate].dots = removeEmptyDotObjects(userCopy.data.selectedDates, stringDate);
        }
        return userCopy;
    }

    const ratingColorMap: Record<number, string> = {
        1: "orange",
        2: "yellow",
        3: "#00e0ff",
        4: "#38ef7d",
        5: "lime"
    };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "mood-modal"}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.graphWrapper}>
                        <AnimatedCircularProgress
                            size={70}
                            width={5}
                            fill={(rangeValue/5)*100}
                            tintColor={ratingColorMap[rangeValue]}
                            backgroundColor="#3d5875" 
                            arcSweepAngle={250}
                            rotation={235}
                        />
                        <Text style={styles.text}>{rangeValue}</Text>
                    </View>
                    <Text style={styles.modalText}>Choose Intensity for</Text>
                    <Text style={styles.modalText}>{mood}</Text>
                    <Slider
                        style={{ width: "100%", height: 70 }}
                        minimumValue={1}
                        maximumValue={5}
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
});
