// Source Imports
import React, { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { journalDot } from "../../utilities/calendarDots";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import CustomToast from "../Toast/customToast";
import JournalTextEntry from "./JournalTextEntry";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Tooltip from "rn-tooltip";

export default function JournalEntryModal(): JSX.Element {
    const { setUserData, userData, setSupplementMap, supplementMap, daySelected, objDaySelected, setCompletedAchievements, completedAchievements, setModalVisible, modalVisible, journalText } = useContext(allPropsContext);

    function handleJournalClose() {
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

        const isJournalDotInList = selectedDatesCopy[stringDate].dots.find(dot => dot.key === "journalCheck");
        const isTextEmpty = !journalText.trim();
        
        if (!isJournalDotInList && !isTextEmpty){
            selectedDatesCopy[stringDate].dots.push(journalDot);
            if (completedAchievements[1].color === "white"){
                achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 1);
            }
        }

        if (isJournalDotInList && isTextEmpty){
            selectedDatesCopy[stringDate].dots.splice(selectedDatesCopy[stringDate].dots.indexOf(isJournalDotInList), 1);
        }

        selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);

        userCopy.data.selectedDates = selectedDatesCopy;
        setUserData(userCopy);
        setSupplementMap(supplementMapCopy);
        setModalVisible("hide-modal");
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "journal" ? true : false}
            onRequestClose={() => {
                setModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.modalText}>{daySelected + " Journal Entry"}</Text>
                    </View>
                    <JournalTextEntry />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleJournalClose()}
                    >
                        <Text style={styles.textStyle}>Close Journal</Text>
                    </Pressable>
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
        width: 125,
        marginBottom: 30
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
