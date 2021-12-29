// Source Imports
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

// Component Imports

// Design Imports

export default function SearchBar({ setQuery, query }: {
    setQuery: (q: string) => void, query: string
}): JSX.Element {
	return(
		<View style={styles.bar}>
			<TextInput
				style={styles.input}
				onChangeText={setQuery}
				value={query}
				multiline
				autoFocus
				placeholder="Search Supplement"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		minWidth: "65%",
		margin: 12,
		borderWidth: 1,
		padding: 10,
		paddingTop: 10,
		backgroundColor: "white",
		textAlign: "center"
	},
	bar: {
		alignSelf: "center"
	}
});
  