// Source Imports
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";

export default function StatsBoxes(): JSX.Element {
    const { userData } = useContext(allPropsContext);

    function grabNumberOfDaysTakenSupplement() {
        const supplementMapCopy = { ...userData.data.supplementMap };
        let count = 0;

        Object.keys(supplementMapCopy).forEach(day => {
            for (let i=0;i<supplementMapCopy[day].SupplementSchedule.length;i++){
                const supp = supplementMapCopy[day].SupplementSchedule[i];
                if(supp.taken === "taken-on-time" || supp.taken === "taken-off-time"){
                    count++;
                    break;
                }
            }
        });

        return count;
    }

    function grabNumberOfDaysWrittenJournal() {
        const supplementMapCopy = { ...userData.data.supplementMap };
        let count = 0;

        Object.keys(supplementMapCopy).forEach(day => {
            if(supplementMapCopy[day].JournalEntry !== ""){
                count++;
            }
        });

        return count;
    }

    function grabNumberOfNotesTaken() {
        const supplementMapCopy = { ...userData.data.supplementMap };
        let count = 0;

        Object.keys(supplementMapCopy).forEach(day => {
            Object.values(supplementMapCopy[day].SupplementSchedule).forEach( supp => {
                if(supp.note){
                    count++;
                }
            });
        });

        return count;
    }

    function grabNumberOfDaysTrackingMood() {
        const supplementMapCopy = { ...userData.data.supplementMap };
        let count = 0;

        Object.keys(supplementMapCopy).forEach(day => {
            if(supplementMapCopy[day].DailyMood[1].mood !== ""){
                count++;
            }
        });

        return count;
    }

    return(
        <>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        {"Number of Days 🗓️ Taken Supplement: "}<Text style={styles.numberText}>{`${grabNumberOfDaysTakenSupplement()}`}</Text>
                    </Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        {"Writer ✍️! \nWrote "}<Text style={styles.numberText}>{`${grabNumberOfDaysWrittenJournal()}`}</Text>
                        <Text style={styles.boxText}> Journal Entries</Text>
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        {"Tracked Your Mood on "}<Text style={styles.numberText}>{`${grabNumberOfDaysTrackingMood()}`}</Text>
                        <Text style={styles.boxText}> Days</Text>
                    </Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        {"Observant 🧐 Took Notes on "}<Text style={styles.numberText}>{`${grabNumberOfNotesTaken()}`}</Text>
                        <Text style={styles.boxText}> Supplements</Text>
                    </Text>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    box: {
        padding: 10,
        margin: 10,
        width: "50%",
        borderRadius: 10,
        backgroundColor: "#163059"
    },
    boxText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        padding: 5,
        marginBottom: 5
    },
    numberText: {
        color: "#36D1DC",
        fontSize: 18,
        textAlign: "center",
        padding: 5,
        marginBottom: 5
    }
});
