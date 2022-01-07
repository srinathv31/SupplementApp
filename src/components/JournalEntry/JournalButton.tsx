// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";


export default function JournalButton( { setModalVisible, setJournalText, daySelected, setSupplementMap, supplementMap }: AppProps): JSX.Element {

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
		setModalVisible({ modal: "journal" });
	}

	return(
		<Icon
			style={{ padding: 10,
				margin: 12 }}
			onPress={() => HandleJournalOpen()}
			name="create-outline" size={30} color={supplementMap[daySelected] !== undefined && supplementMap[daySelected].JournalEntry !== "" ? "lime" : "white"}
		/>
	);
}
