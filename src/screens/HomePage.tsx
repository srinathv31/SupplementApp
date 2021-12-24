// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import JournalButton from "../components/JournalEntry/JournalButton";
import JournalEntryModal from "../components/JournalEntry/JournalEntryModal";

// Component Imports

// Design Imports

export default function HomePage({ setJournalVisible, journalVisible }: {
    setJournalVisible: (j: boolean) => void, journalVisible: boolean
}): JSX.Element {
    return(
      <View>
        <HeaderWindow
          setJournalVisible={setJournalVisible}
          journalVisible={journalVisible}
        ></HeaderWindow>
        <ExploreWindow></ExploreWindow>
        <Divider></Divider>
        <DailySupplementWindow></DailySupplementWindow>
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
