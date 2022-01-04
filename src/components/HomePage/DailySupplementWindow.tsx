// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SupplementObject } from "../../interfaces/Supplement";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports

export default function DailySupplementWindow({ setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected, setModalVisible, setSelectedSupplement }: AppProps): JSX.Element {

	function removeSupplement(item: SupplementObject) {
		const supplementMapCopy = { ...supplementMap };

		supplementMapCopy[daySelected].SupplementSchedule = supplementMapCopy[daySelected].SupplementSchedule.filter(listItem => listItem !== item);
		removeDate(objDaySelected, supplementMapCopy);
		if (Object.values(supplementMapCopy[daySelected].SupplementSchedule).length === 0 && supplementMapCopy[daySelected].JournalEntry === "") {
			delete supplementMapCopy[daySelected];
		}
		setSupplementMap(supplementMapCopy);
	}

	function removeDate(day: DateData, supplementMap: AppProps["supplementMap"]){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 0){
			selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "supplementCheck") as [{key: string, color: string}];
		}
		setSelectedDates(selectedDatesCopy);
	}

	function changeTime(item: SupplementObject) {
		setSelectedSupplement(item);
		setModalVisible({ modal: "time-modal" });
	}

	return(
		<View style={{ alignSelf: "center" }}>
			<View style={{ flex: 1 }}>
				<FlatList
					data={supplementMap[daySelected] === undefined ? [] : supplementMap[daySelected].SupplementSchedule}
					renderItem={({ item }) => (
						<TouchableOpacity key={item.Supplement.name} onPress={() => console.log(item.Supplement.name)}>
							<View style={styles.ListItem}>
								{item.time === "" && <Icon onPress={() => changeTime(item)} name="clock" style={styles.IconPadding}/>}
								<Text onPress={() => changeTime(item)} style={styles.ListName}>
									{item.time !== "" && item.time+":"}
								</Text> 
								<Text style={styles.ListName}>
									{item.Supplement.name}
								</Text>
								<Icon onPress={() => removeSupplement(item)}
									name="delete-forever" style={styles.IconPadding}/>
							</View>
						</TouchableOpacity>
					)}
				></FlatList>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	ListItem: {
		textAlign: "center",
		padding: 10,
		margin: 10,
		borderRadius: 5,
		backgroundColor: "#112442",
		overflow:"hidden",
		flexDirection: "row",
		justifyContent: "space-evenly",
		
	},
	ListName: {
		fontSize: 18,
		fontWeight: "600",
		color: "#EEE"
	},
	IconPadding: {
		padding: 1,
		margin: 1,
		fontSize: 18,
		color: "#EEE"
	}
});
