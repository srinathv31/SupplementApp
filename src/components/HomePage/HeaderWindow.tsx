// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import UserPageButton from "./UserPageButton";
import NextDayButton from "../Calendar/NextDayButton";
import PrevDayButton from "../Calendar/PrevDayButton";
import JournalButton from "../JournalEntry/JournalButton";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";
import TimePicker from "../SupplementViews/TimePicker";
import MultipleDatePicker from "../SupplementViews/MultipleDatePicker";


export default function HeaderWindow(AllProps: AppProps): JSX.Element {
  
    return(
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <UserPageButton {...AllProps}></UserPageButton>
            <PrevDayButton  {...AllProps}></PrevDayButton>
            <Text style={styles.sectionTitle}>{AllProps.daySelected}</Text>
            <NextDayButton {...AllProps}></NextDayButton>
            <JournalEntryModal {...AllProps}></JournalEntryModal>
            <JournalButton {...AllProps}></JournalButton>
            <TimePicker {...AllProps}></TimePicker>
            <MultipleDatePicker {...AllProps}></MultipleDatePicker>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        padding: 10,
        margin: 12,
        color: "white"
    }
});
