// Source Imports
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports

export default function JournalTextEntry({ setJournalText, journalText }: {
    setJournalText: AppProps["setJournalText"], journalText: AppProps["journalText"]
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
