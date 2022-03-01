// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import { journalDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects, { removeJournalDot } from "../../utilities/removeEmptyDotObjects";
import JournalTextEntry from "./JournalTextEntry";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Tooltip from "rn-tooltip";

export default function JournalEntryModal({ setUserData, userData, setModalVisible, modalVisible, setSupplementMap, supplementMap, daySelected, setJournalText, journalText, objDaySelected }: 
	AppProps): JSX.Element {


    function handleJournal() {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };
        const selectedDatesCopy = { ...userCopy.data.selectedDates };
        const stringDate = objDaySelected.dateString;

        if (supplementMapCopy[daySelected] === undefined) {
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: 
            { 
                "1": { mood: "", range: 0, TimelineData: [] },
                "2": { mood: "", range: 0, TimelineData: [] },
                "3": { mood: "", range: 0, TimelineData: [] }
            } };
        }

        supplementMapCopy[daySelected].JournalEntry = journalText;

        // Create calendar object
        if (selectedDatesCopy[stringDate] === undefined){
            selectedDatesCopy[stringDate] = { dots: [{ key: "", color: "" }], selected: true };
        }

        // if the journal entry is empty + there are no supplements added to the day delete that day object + there are no moods
        if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length === 0 && supplementMapCopy[daySelected].DailyMood["1"].mood === "") {
            delete supplementMapCopy[daySelected];
            selectedDatesCopy[stringDate].dots = removeJournalDot(selectedDatesCopy, stringDate);
        }
        // else if the journal entry is empty + there are no moods: then set the journalEntry to an empty string + remove journal dot
        else if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length > 0 && supplementMapCopy[daySelected].DailyMood["1"].mood === "") {
            supplementMapCopy[daySelected].JournalEntry = "";
            selectedDatesCopy[stringDate].dots = removeJournalDot(selectedDatesCopy, stringDate);
        }
        // else if there is a journal entry and there is no previously set journalDot, then set the journalDot in the calendar
        else if (supplementMapCopy[daySelected].JournalEntry.trim()){
            if (!selectedDatesCopy[stringDate].dots.includes(journalDot)) {
                selectedDatesCopy[stringDate].dots.push(journalDot);
            }
            selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);
        }
    
        userCopy.data.selectedDates = selectedDatesCopy;
        setUserData(userCopy);
        setSupplementMap(supplementMapCopy);

        setModalVisible({ modal: "hide-modal" });
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "journal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.modalText}>{daySelected + " Journal Entry"}</Text>
                        {/* <Tooltip
                            popover={ <Text>{(supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "") 
                                ? `Selected Mood for today ${supplementMap[daySelected].DailyMood.mood}: ${supplementMap[daySelected].DailyMood.range}`
                                : "No Mood Selected for Today"}</Text> }
                            actionType="press"
                            withOverlay={false}
                            width={120}
                            height={100}
                            containerStyle={{ height: 80, marginTop: -30 }}
                            pointerStyle={{ marginTop: -30 }}
                        >
                            <Icon
                                style={{ alignSelf: "flex-start" }} name="emoticon-happy-outline" size={30} color={ supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "" ? "lime" : "white" }/>
                        </Tooltip> */}
                    </View>
                    <JournalTextEntry
                        setJournalText={setJournalText}
                        journalText={journalText}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleJournal()}
                    >
                        <Text style={styles.textStyle}>Close Journal</Text>
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
        alignItems: "center",
        marginTop: 5
    },
    modalView: {
        margin: 20,
        marginBottom: "80%",
        backgroundColor: "#121212",
        borderRadius: 20,
        paddingBottom: 15,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125
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
        marginBottom: 5,
        textAlign: "center",
        width: 175,
        color: "white",
        fontSize: 25
    }
});
