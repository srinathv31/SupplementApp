// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import CalendarButton from "../Calendar/CalendarButton";
import NextDayButton from "../Calendar/NextDayButton";
import PrevDayButton from "../Calendar/PrevDayButton";
import JournalButton from "../JournalEntry/JournalButton";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";

// Component Imports

// Design Imports


export default function HeaderWindow({ setModalVisible, modalVisible, setVisiblePage, daySelected, setDaySelected, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setModalVisible: (j: string) => void, modalVisible: string,
    setVisiblePage: (v: string) => void,
    setDaySelected: (d: string) => void, daySelected: string,
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
}): JSX.Element {
    return(
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <CalendarButton
                setVisiblePage={setVisiblePage}
            ></CalendarButton>
            <PrevDayButton
                setDaySelected={setDaySelected}
                setObjDaySelected={setObjDaySelected}
                objDaySelected={objDaySelected}
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
            ></PrevDayButton>
            <Text style={styles.sectionTitle}>{daySelected}</Text>
            <NextDayButton
                setDaySelected={setDaySelected}
                setObjDaySelected={setObjDaySelected}
                objDaySelected={objDaySelected}
                setSelectedDates={setSelectedDates}
                selectedDates={selectedDates}
            ></NextDayButton>
            <JournalEntryModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            ></JournalEntryModal>
            <JournalButton
                setModalVisible={setModalVisible}
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
