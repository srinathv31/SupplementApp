// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import DateTimePicker from "@react-native-community/datetimepicker";
import sortDailyList from "../../utilities/sortDailyList";
import convertDateTimeToStringTime from "../../utilities/convertTime";
// Component Imports

// Design Imports

export default function TimePicker({ setModalVisible, modalVisible, selectedSupplement, setSupplementMap, supplementMap, daySelected }: 
	AppProps): JSX.Element {
	const [time, setTime] = useState<Date>(new Date());

	function handleJournal() {
		setModalVisible("hide-modal");
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onChange = (event: any, selectedDate: any) => {
		const supplementMapCopy = { ...supplementMap };
		const currentDate = selectedDate || time;
		const convertedTime = convertDateTimeToStringTime(currentDate);
		Object.values(supplementMapCopy[daySelected].SupplementSchedule).forEach(supplement => {
			if (supplement === selectedSupplement) {
				supplement.time = convertedTime;
			}
		});
		supplementMapCopy[daySelected].SupplementSchedule = sortDailyList(supplementMapCopy[daySelected].SupplementSchedule);
		setSupplementMap(supplementMap);
		setTime(currentDate);
	};

	return(
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible === "time-modal" ? true : false}
			onRequestClose={() => {
				setModalVisible("hide-modal");
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Changing: {selectedSupplement.Supplement.name} {selectedSupplement.time}</Text>
					<DateTimePicker
						testID="dateTimePicker"
						value={time}
						mode={"time"}
						is24Hour={true}
						display="spinner"
						textColor="white"
						onChange={onChange}
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
