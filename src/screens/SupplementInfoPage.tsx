// Source Imports
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import SupplementList from "../assets/SupplementList.json";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementInfoPage({ setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
    objDaySelected: DateData
}): JSX.Element {
    const [query, setQuery] = useState<string>("");

    return(
        <View>
            <SearchBar
                setQuery={setQuery}
                query={query}
            ></SearchBar>
            <SupplementListView
                setSupplementMap={setSupplementMap}
                supplementMap={supplementMap}
                fontSizeNumber={24}
                query={query}
                daySelected={daySelected}
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
                objDaySelected={objDaySelected}
            ></SupplementListView>
        </View>
    );
}

const styles = StyleSheet.create({
    ListItem: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: "center",
      padding: 5,
      margin: 10,
      color: "white",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "orange",
      overflow:"hidden"
    }
});
