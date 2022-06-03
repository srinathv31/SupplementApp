// Source Imports
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { journalDot } from "../../utilities/calendarDots";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";

export default function JournalCloseButton({ journalText }: {
    journalText: string
}): JSX.Element {
    const { setUserData, userData, setSupplementMap, supplementMap, daySelected, objDaySelected, setCompletedAchievements, completedAchievements, setModalVisible } = useContext(allPropsContext);
    
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
        <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleJournalClose()}
        >
            <Text style={styles.textStyle}>Close Journal</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        marginBottom: 30
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
