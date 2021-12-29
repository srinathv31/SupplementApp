// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function JournalButton( { setModalVisible, setJournalText, daySelected, setSupplementMap, supplementMap }: {
    setModalVisible: (j: string) => void,
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setJournalText: (j: string) => void
}): JSX.Element {

	function HandleJournalOpen() {
		const supplementMapCopy = { ...supplementMap };

		if (supplementMapCopy[daySelected] === undefined) {
			supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "" };
		}
		if (supplementMapCopy[daySelected].JournalEntry === "") {
			setJournalText("");
		} else {
			setJournalText(supplementMapCopy[daySelected].JournalEntry);
		}
		setSupplementMap(supplementMapCopy);
		setModalVisible("1");
	}

	return(
		<Icon
			style={{ padding: 10,
				margin: 12 }}
			onPress={() => HandleJournalOpen()}
			name="create-outline" size={30} color="white"
		/>
	);
}
