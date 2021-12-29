// Source Imports
import React from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function DailySupplementModal({ setModalVisible, modalVisible, setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    setModalVisible: (m: string) => void, modalVisible: string,
    setSupplementMap: (s: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
    objDaySelected: DateData
}): JSX.Element {

	function removeSupplement(item: Supplement) {
		const supplementMapCopy = { ...supplementMap };

		supplementMapCopy[daySelected].SupplementSchedule = supplementMapCopy[daySelected].SupplementSchedule.filter(listItem => listItem !== item);
		removeDate(objDaySelected, supplementMapCopy);
		if (Object.values(supplementMapCopy[daySelected].SupplementSchedule).length === 0 && supplementMapCopy[daySelected].JournalEntry === "") {
			delete supplementMapCopy[daySelected];
		}
		setSupplementMap(supplementMapCopy);
	}

	function removeDate(day: DateData, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 0){
			selectedDatesCopy[stringDate].marked = false;
		}
		setSelectedDates(selectedDatesCopy);
	}

	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible === "3" ? true : false}
			onRequestClose={() => {
				setModalVisible("0");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{daySelected}</Text>
					<FlatList
						data={supplementMap[daySelected] === undefined ? [] : supplementMap[daySelected].SupplementSchedule}
						renderItem={({ item }) => (
							<TouchableHighlight
								key={item.name}
                      
							>
								<View style={styles.ListItem}>
									<Text style={styles.ListName}>{item.time}: {item.name}</Text>
									<Icon onPress={() => removeSupplement(item)}
										name="delete-forever" style={styles.IconPadding}/>
								</View>
							</TouchableHighlight>
						)}
					></FlatList>
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
	},
	ListItem: {
		textAlign: "center",
		padding: 10,
		margin: 10,
		color: "black",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "orange",
		overflow:"hidden",
		flexDirection: "row"
	},
	ListName: {
		fontSize: 18,
		fontWeight: "600",
	},
	IconPadding: {
		padding: 1,
		margin: 1,
		fontSize: 18
	}
});
