// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Supplement from "../../interfaces/Supplement";
import SupplementListView from "./SupplementListView";

// Component Imports

// Design Imports

export default function SupplementModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    setModalVisible: (s: string) => void, modalVisible: string,
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
    objDaySelected: DateData
}): JSX.Element {
	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible === "2" ? true : false}
			onRequestClose={() => {
				setModalVisible("0");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Supplement List</Text>
					<SupplementListView
						setSupplementMap={setSupplementMap}
						supplementMap={supplementMap}
						fontSizeNumber={18}
						query={""}
						daySelected={daySelected}
						setSelectedDates={setSelectedDates}
						selectedDates={selectedDates}
						objDaySelected={objDaySelected}
					></SupplementListView>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible("0")}
					>
						<Text style={styles.textStyle}>Close</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: "25%",
		maxHeight: "55%"
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
