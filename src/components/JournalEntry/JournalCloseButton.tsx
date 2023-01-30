// Source Imports
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import shallow from "zustand/shallow";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { journalDot } from "../../utilities/calendarDots";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import useClientStore from "../../zustand/clientStore";

export default function JournalCloseButton({ journalText }: {
    journalText: string
}): JSX.Element {
    const { setUserData, userData } = useContext(allPropsContext);

    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const daySelected = useClientStore(state => state.daySelected);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow); 
    const objDaySelected = useClientStore(state => state.objDaySelected);

    function handleJournalClose() {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };
        const selectedDatesCopy = { ...userCopy.data.selectedDates };
        const stringDate = objDaySelected.dateString;

        if (supplementMapCopy[daySelected] === undefined) {
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: [] };
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
                achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 1);
            }
        }

        if (isJournalDotInList && isTextEmpty){
            selectedDatesCopy[stringDate].dots.splice(selectedDatesCopy[stringDate].dots.indexOf(isJournalDotInList), 1);
        }

        selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);

        userCopy.data.selectedDates = selectedDatesCopy;
        setUserData(userCopy);
        updateSupplementMap(supplementMapCopy);
        updateModalVisible("hide-modal");
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
