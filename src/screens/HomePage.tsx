// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import JournalButton from "../components/JournalEntry/JournalButton";
import JournalEntryModal from "../components/JournalEntry/JournalEntryModal";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function HomePage({ setModalVisible, modalVisible, setSupplementMap, supplementMap, setVisiblePage, setDaySelected, daySelected, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setModalVisible: (j: string) => void, modalVisible: string,
    setSupplementMap: (d: Record<string, Supplement[]>) => void, supplementMap: Record<string, Supplement[]>,
    setVisiblePage: (v: string) => void,
    setDaySelected: (d: string) => void, daySelected: string,
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
}): JSX.Element {
    return(
      <View>
        <HeaderWindow
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setVisiblePage={setVisiblePage}
          daySelected={daySelected}
          setDaySelected={setDaySelected}
          setObjDaySelected={setObjDaySelected}
          objDaySelected={objDaySelected}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
        ></HeaderWindow>
        <ExploreWindow></ExploreWindow>
        <Divider></Divider>
        <DailySupplementWindow
          setSupplementMap={setSupplementMap}
          supplementMap={supplementMap}
          daySelected={daySelected}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
          objDaySelected={objDaySelected}
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
