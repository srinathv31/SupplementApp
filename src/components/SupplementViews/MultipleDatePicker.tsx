// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import { Calendar } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import Supplement from "../../interfaces/Supplement";
import { getDateString } from "../../utilities/getCurrentDate";
import sortDailyList from "../../utilities/sortDailyList";
import { supplementDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";

// Component Imports

// Design Imports

export default function MultipleDatePicker({ setModalVisible, modalVisible, setSelectedDates, selectedDates, setSupplementMap, supplementMap, selectedSupplement, setMultipleAddMode }: AppProps): JSX.Element {
	const [schedule, setSchedule] = useState<{[date: string]: {selected: boolean, day: DateData}}>();

	function addSupplement(item: Supplement, dayString: string) {
		const supplementMapCopy = { ...supplementMap };
        
		if (supplementMapCopy[dayString] === undefined){
			supplementMapCopy[dayString] = { SupplementSchedule: [], JournalEntry: "" };
		}
        
		supplementMapCopy[dayString].SupplementSchedule.push({ Supplement: item, time: selectedSupplement.time });

		supplementMapCopy[dayString].SupplementSchedule = sortDailyList(supplementMapCopy[dayString].SupplementSchedule);

		return supplementMapCopy[dayString].SupplementSchedule;
	}

	function addDate(day: DateData, supplementMap: Record<string, {SupplementSchedule: {Supplement: Supplement, time: string}[], JournalEntry: string}>, dayString: string){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[dayString].SupplementSchedule).length > 0){
			if (selectedDatesCopy[stringDate] === undefined) {
				selectedDatesCopy[stringDate] = { dots:[{ key: "", color: "" }], selected: false };
			}
			if (Object.values(supplementMap[dayString].SupplementSchedule).length === 1){
				selectedDatesCopy[stringDate].dots.push(supplementDot);
			}
			selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);
		}
		return selectedDatesCopy[stringDate];
	}

	function handleJournal() {
		const supplementMapCopy = { ...supplementMap };
		const selectedDatesCopy = { ...selectedDates };
		if (schedule !== undefined){
			Object.values(schedule).forEach(item => {
				const strDate = getDateString(item.day);
				if (supplementMapCopy[strDate] === undefined) {
					supplementMapCopy[strDate] = { SupplementSchedule: [], JournalEntry: "" };
				}
				supplementMapCopy[strDate].SupplementSchedule = addSupplement(selectedSupplement.Supplement, strDate);
				if (selectedDatesCopy[item.day.dateString] === undefined) {
					selectedDatesCopy[item.day.dateString] = { dots:[{ key: "", color: "" }], selected: false };
				}
				selectedDatesCopy[item.day.dateString] = addDate(item.day, supplementMapCopy, strDate);
			});
		}
		setSelectedDates(selectedDatesCopy);
		setSupplementMap(supplementMapCopy);
		setModalVisible("hide-modal");
		setSchedule({});
		setMultipleAddMode(false);
	}

	function addDayToSchedule(day: DateData) {
		let scheduleCopy = { ...schedule };
		
		if (scheduleCopy === undefined){
			scheduleCopy = { [day.dateString]: { selected: true, day: day } };
		}
		if (scheduleCopy[day.dateString]) {
			scheduleCopy[day.dateString].selected = false;
			delete scheduleCopy[day.dateString];
		} else {
			scheduleCopy[day.dateString] = { selected: true, day: day };
		}
		setSchedule(scheduleCopy);
	}

	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible === "calendar-modal" ? true : false}
			onRequestClose={() => {
				setModalVisible("hide-modal");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Choose Dates for {selectedSupplement.Supplement.name}</Text>
					<Calendar
						markedDates={schedule}
						theme={{
							calendarBackground: "#0B172A",
							dayTextColor: "white",
							textDisabledColor: "grey",
							monthTextColor: "white"
						}}
						onDayPress={(day) => addDayToSchedule(day)}
					/>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => handleJournal()}
					>
						<Text style={styles.textStyle}>Set Dates</Text>
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
		alignItems:"center",
		marginTop: "60%" 
	},
	modalView: {
		width: "75%", padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: "#0B172A",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.75,
		shadowRadius: 4,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		width: 125,
		alignSelf: "center"
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
		fontSize: 18,
		fontWeight: "600",
		color: "white",
		textAlign: "center"
	}
});
