// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import { journalDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects, { removeJournalDot } from "../../utilities/removeEmptyDotObjects";
import JournalTextEntry from "./JournalTextEntry";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { showMoodToast } from "../../utilities/toasts";
import Toast from "react-native-toast-message";


export default function JournalEntryModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, daySelected, setJournalText, journalText, setSelectedDates, selectedDates, objDaySelected }: 
	AppProps): JSX.Element {


    function handleJournal() {
        const supplementMapCopy = { ...supplementMap };
        const selectedDatesCopy = { ...selectedDates };
        const stringDate = objDaySelected.dateString;

        if (supplementMapCopy[daySelected] === undefined) {
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: { mood: "", range: 0 } };
        }

        supplementMapCopy[daySelected].JournalEntry = journalText;

        // if the journal entry is empty + there are no supplements added to the day delete that day object
        if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length === 0) {
            delete supplementMapCopy[daySelected];
            selectedDatesCopy[stringDate].dots = removeJournalDot(selectedDatesCopy, stringDate);
        }
        // else if only the journal entry is empty then set the journalEntry to an empty string
        else if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length > 0) {
            supplementMapCopy[daySelected].JournalEntry = "";
            selectedDatesCopy[stringDate].dots = removeJournalDot(selectedDatesCopy, stringDate);
        }
        // else if there is a journal entry and there is no previously set journalDot, then set the journalDot in the calendar
        else if (supplementMapCopy[daySelected].JournalEntry.trim()){
            if (selectedDatesCopy[stringDate] === undefined){
                selectedDatesCopy[stringDate] = { dots: [{ key: "", color: "" }], selected: true };
            }
            if (!selectedDatesCopy[stringDate].dots.includes(journalDot)) {
                selectedDatesCopy[stringDate].dots.push(journalDot);
            }
            selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);
        }
    
        setSelectedDates(selectedDatesCopy);
        setSupplementMap(supplementMapCopy);

        setModalVisible({ modal: "hide-modal" });
    }

    function showMood() {
        (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "") ? 
            showMoodToast(supplementMap[daySelected].DailyMood) :
            showMoodToast(supplementMap[daySelected].DailyMood);
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
                        <Icon onPress={showMood}
                            style={{ justifyContent: "flex-end" }} name="emoticon-happy-outline" size={30} color={ supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "" ? "lime" : "white" }/>
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
                <Toast />

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
