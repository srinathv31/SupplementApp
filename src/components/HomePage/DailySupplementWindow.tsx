// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Supplement from "../../interfaces/Supplement";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports

export default function DailySupplementWindow({ setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: AppProps): JSX.Element {

	function removeSupplement(item: Supplement) {
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

	return(
		<View style={{ alignSelf: "center" }}>
			<FlatList
				data={supplementMap[daySelected] === undefined ? [] : supplementMap[daySelected].SupplementSchedule}
				renderItem={({ item }) => (
					<TouchableHighlight key={item.name}>
						<View style={styles.ListItem}>
							<Text style={styles.ListName}>{item.time}: {item.name}</Text>
							<Icon onPress={() => removeSupplement(item)}
								name="delete-forever" style={styles.IconPadding}/>
						</View>
					</TouchableHighlight>
				)}
			></FlatList>
		</View>
	);
}


const styles = StyleSheet.create({
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
