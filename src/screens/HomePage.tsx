// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import JournalButton from "../components/JournalEntry/JournalButton";
import JournalEntryModal from "../components/JournalEntry/JournalEntryModal";

// Component Imports

// Design Imports

export default function HomePage({ setJournalVisible, journalVisible }: {
    setJournalVisible: (j: boolean) => void, journalVisible: boolean
}): JSX.Element {
    return(
      <View>
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
        <View style={{flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "35%", borderRadius: 10, padding: 10, margin: 10}}>
          <Text style={{fontSize: 22, fontWeight: "600"}}>Explore</Text>
          <Text>Supplement</Text>
          <Text>Info</Text>
        </View>
        <View style={{backgroundColor: "white", minHeight: 1, width: "95%", alignSelf: "center"}}></View>
        <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 10, marginBottom: 5, marginLeft: 25, marginRight: 25}}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>7:00AM: Recommended Supplement</Text>
        </View>
        <View style={{flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 5, marginLeft: 25, marginRight: 25}}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>10:00AM: Recommended Supplement</Text>
        </View>
      </View>
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
      margin: 12,
      color: "white"
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
