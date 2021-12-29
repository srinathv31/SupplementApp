// Source Imports
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function JournalTextEntry({ setSupplementMap, supplementMap, daySelected, setJournalText, journalText }: {
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setJournalText: (j: string) => void, journalText: string
}): JSX.Element {

    return(
        <TextInput
            style={styles.input}
            onChangeText={setJournalText}
            value={journalText}
            multiline
            autoFocus
            placeholder="How did you feel today?"
        />
    );
}

const styles = StyleSheet.create({
    input: {
      height: 300,
      width: 350,
      margin: 12,
      padding: 10,
    },
});
