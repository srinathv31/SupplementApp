// Source Imports
import React, { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import Supplement, { SupplementMapObject } from "../../interfaces/Supplement";
import { getDateString } from "../../utilities/getCurrentDate";
import sortDailyList from "../../utilities/sortDailyList";
import { supplementDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";
import { globalPropsContext } from "../../contextHooks/GlobalPropsContext";

export default function MultipleDatePicker(): JSX.Element {
    const { setUserData, userData } = useContext(globalPropsContext);

    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);
    const updateMultipleAddMode = useClientStore(state => state.updateMultipleAddMode);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);
    const selectedSupplement = useClientStore(state => state.selectedSupplement);

    const [schedule, setSchedule] = useState<{[date: string]: {selected: boolean, day: DateData}}>();

    function addSupplement(item: Supplement, dayString: string) {
        const supplementMapCopy = { ...supplementMap };
        
        if (supplementMapCopy[dayString] === undefined){
            supplementMapCopy[dayString] = { SupplementSchedule: [], JournalEntry: "", DailyMood: [] };
        }
        
        supplementMapCopy[dayString].SupplementSchedule.push({ Supplement: item, time: selectedSupplement.time, taken: "not-taken", dosage: selectedSupplement.dosage });

        supplementMapCopy[dayString].SupplementSchedule = sortDailyList(supplementMapCopy[dayString].SupplementSchedule);

        if (completedAchievements[0].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 0);
        }

        return supplementMapCopy[dayString].SupplementSchedule;
    }

    function addDate(day: DateData, supplementMap: Record<string, SupplementMapObject>, dayString: string){
        const selectedDatesCopy = { ...userData.data.selectedDates };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[dayString].SupplementSchedule).length > 0){
            if (selectedDatesCopy[stringDate] === undefined) {
                selectedDatesCopy[stringDate] = { dots:[{ key: "", color: "" }], selected: false };
            }
            if (Object.values(supplementMap[dayString].SupplementSchedule).length === 1){
                selectedDatesCopy[stringDate].dots.push(supplementDot);
            }
            selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);
        }
        return selectedDatesCopy[stringDate];
    }

    function handleJournal() {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };
        const selectedDatesCopy = { ...userCopy.data.selectedDates };
        if (schedule !== undefined){
            Object.values(schedule).forEach(item => {
                const strDate = getDateString(item.day);
                if (supplementMapCopy[strDate] === undefined) {
                    supplementMapCopy[strDate] = { SupplementSchedule: [], JournalEntry: "", DailyMood: [] };
                }
                supplementMapCopy[strDate].SupplementSchedule = addSupplement(selectedSupplement.Supplement, strDate);
                if (selectedDatesCopy[item.day.dateString] === undefined) {
                    selectedDatesCopy[item.day.dateString] = { dots:[{ key: "", color: "" }], selected: false };
                }
                selectedDatesCopy[item.day.dateString] = addDate(item.day, supplementMapCopy, strDate);
            });
        }
        userCopy.data.selectedDates = selectedDatesCopy;
        setUserData(userCopy);
        saveUserData(userData, setUserData, supplementMapCopy);
        
        updateSupplementMap(supplementMapCopy);
        updateModalVisible("hide-modal");
        setSchedule({});
        updateMultipleAddMode(false);
        if (completedAchievements[3].color === "white" && schedule !== undefined && Object.keys(schedule).length > 0) {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 3);
        }
    }

    function addDayToSchedule(day: DateData) {
        let scheduleCopy = { ...schedule };
		
        if (scheduleCopy === undefined){
            scheduleCopy = { [day.dateString]: { selected: true, day: day } };
        }
        if (scheduleCopy[day.dateString]) {
            scheduleCopy[day.dateString].selected = false;
            delete scheduleCopy[day.dateString];
        } else {
            scheduleCopy[day.dateString] = { selected: true, day: day };
        }
        setSchedule(scheduleCopy);
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "calendar-modal" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose Dates for {selectedSupplement.Supplement.name}</Text>
                    <Calendar
                        markedDates={schedule}
                        theme={{
                            calendarBackground: "#0B172A",
                            dayTextColor: "white",
                            textDisabledColor: "grey",
                            monthTextColor: "white"
                        }}
                        onDayPress={(day) => addDayToSchedule(day)}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleJournal()}
                    >
                        <Text style={styles.textStyle}>Set Dates</Text>
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
        alignItems:"center"
    },
    modalView: {
        width: "75%", padding: 10,
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
