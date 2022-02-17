// Source Imports
import React from "react";
import { Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";

export default function StatsBoxes({ userData }: {
    userData: AppProps["userData"]
}): JSX.Element {

    function grabNumberOfDaysTakenSupplement() {
        const supplementMapCopy = { ...userData.data.supplementMap };
        let count = 0;

        Object.keys(supplementMapCopy).forEach(day => {
            Object.values(supplementMapCopy[day].SupplementSchedule).forEach( supp => {
                if(supp.taken === "taken-on-time" || supp.taken === "taken-off-time"){
                    count++;
                }
            });
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
                if(supp.note !== ""){
                    count++;
                }
            });
        });

        return count;
    }

    return(
        <>
            <View style={{ flexDirection: "row" }}>
                <View style={{ padding: 10, margin: 10, width: "50%", borderRadius: 10, backgroundColor: "#163059" }}>
                    <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>Number of Days Taken Supplement: {grabNumberOfDaysTakenSupplement()}</Text>
                </View>
                <View style={{ padding: 10, margin: 10, width: "50%", borderColor: "white", borderRadius: 5, backgroundColor: "#163059" }}>
                    <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>{`Writer ✍️! \nWritten ${grabNumberOfDaysWrittenJournal()} Journals`}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ padding: 10, margin: 10, width: "50%", borderColor: "white", borderRadius: 5, backgroundColor: "#163059" }}>
                    <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>Workout Machine 🏋️‍♀️</Text>
                </View>
                <View style={{ padding: 10, margin: 10, width: "50%", borderColor: "white", borderRadius: 5, backgroundColor: "#163059" }}>
                    <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>{`Observant 🧐 Taken Notes on ${grabNumberOfNotesTaken()} Supplements`}</Text>
                </View>
            </View>
        </>
    );
}
