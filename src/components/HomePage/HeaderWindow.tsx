// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import JournalButton from "../JournalEntry/JournalButton";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";

// Component Imports

// Design Imports


export default function HeaderWindow({ setJournalVisible, journalVisible }: {
    setJournalVisible: (j: boolean) => void, journalVisible: boolean
}): JSX.Element {
    return(
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <JournalButton
                setJournalVisible={setJournalVisible}
            ></JournalButton>
            <Text style={styles.sectionTitle}>Home Page</Text>
            <JournalEntryModal
                setJournalVisible={setJournalVisible}
                journalVisible={journalVisible}
            ></JournalEntryModal>
            <JournalButton
                setJournalVisible={setJournalVisible}
            ></JournalButton>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: "center",
      padding: 10,
      margin: 12,
      color: "white"
    }
});
