// Source Imports
import React from "react";
import { StyleSheet, Text } from "react-native";
import JournalButton from "../components/JournalEntry/JournalButton";
import JournalEntryModal from "../components/JournalEntry/JournalEntryModal";

// Component Imports

// Design Imports

export default function HomePage({ setJournalVisible, journalVisible }: {
    setJournalVisible: (j: boolean) => void, journalVisible: boolean
}): JSX.Element {
    return(
        <>
            <Text style={styles.sectionTitle}>Home Page</Text>
            <JournalEntryModal
                setJournalVisible={setJournalVisible}
                journalVisible={journalVisible}
            ></JournalEntryModal>
            <JournalButton
                setJournalVisible={setJournalVisible}
            ></JournalButton>
        </>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: "center",
      padding: 10,
      margin: 12
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
});
