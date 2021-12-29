// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Supplement from "../../interfaces/Supplement";
import JournalTextEntry from "./JournalTextEntry";

// Component Imports

// Design Imports

export default function JournalEntryModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, daySelected, setJournalText, journalText }: {
    setModalVisible: (j: string) => void, modalVisible: string,
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setJournalText: (j: string) => void, journalText: string
}): JSX.Element {


	function handleJournal() {
		const supplementMapCopy = { ...supplementMap };

		if (supplementMapCopy[daySelected] === undefined) {
			supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "" };
		}

		supplementMapCopy[daySelected].JournalEntry = journalText;

		// if the journal entry is empty + there are no supplements added to the day delete that day object
		if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length === 0) {
			delete supplementMapCopy[daySelected];
		}
		// else if only the journal entry is empty then set the journalEntry to an empty string
		else if (!supplementMapCopy[daySelected].JournalEntry.trim() && supplementMapCopy[daySelected].SupplementSchedule.length > 0) {
			supplementMapCopy[daySelected].JournalEntry = "";
		}
    
		setSupplementMap(supplementMapCopy);

		setModalVisible("0");
	}


	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible === "1" ? true : false}
			onRequestClose={() => {
				setModalVisible("0");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{"Today's Journal"}</Text>
					<JournalTextEntry
						setJournalText={setJournalText}
						journalText={journalText}
					/>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => handleJournal()}
					>
						<Text style={styles.textStyle}>Close Journal</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		paddingBottom: 15,
		paddingTop: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: 125
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		width: 125,
		textDecorationLine: "underline"
	}
});
