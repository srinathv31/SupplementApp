// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import JournalButton from "../components/JournalEntry/JournalButton";
import JournalEntryModal from "../components/JournalEntry/JournalEntryModal";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function HomePage({ setJournalVisible, journalVisible, setDailyList, dailyList, setVisiblePage }: {
    setJournalVisible: (j: boolean) => void, journalVisible: boolean,
    setDailyList: (d: Record<string, Supplement[]>) => void, dailyList: Record<string, Supplement[]>,
    setVisiblePage: (v: string) => void
}): JSX.Element {
    return(
      <View>
        <HeaderWindow
          setJournalVisible={setJournalVisible}
          journalVisible={journalVisible}
          setVisiblePage={setVisiblePage}
        ></HeaderWindow>
        <ExploreWindow></ExploreWindow>
        <Divider></Divider>
        <DailySupplementWindow
          setDailyList={setDailyList}
          dailyList={dailyList}
        ></DailySupplementWindow>
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
