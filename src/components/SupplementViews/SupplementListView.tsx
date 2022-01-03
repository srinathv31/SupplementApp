// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import SupplementList from "../../assets/SupplementList.json";
import { AppProps } from "../../interfaces/Props";
import Supplement from "../../interfaces/Supplement";
import { supplementDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";

// Component Imports

// Design Imports

export default function SupplementListView({ fontSizeNumber, query, setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    fontSizeNumber: number,
    query: string,
	setSupplementMap: AppProps["setSupplementMap"], supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"], 
	setSelectedDates: AppProps["setSelectedDates"], selectedDates: AppProps["selectedDates"], objDaySelected: AppProps["objDaySelected"]
}): JSX.Element {

	function addSupplement(item: Supplement) {
		const supplementMapCopy = { ...supplementMap };
        
		if (supplementMapCopy[daySelected] === undefined){
			supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "" };
		}
        
		supplementMapCopy[daySelected].SupplementSchedule.push({ Supplement: item, time: "" });
		addDate(objDaySelected, supplementMapCopy);

		setSupplementMap(supplementMapCopy);

	}

	function addDate(day: DateData, supplementMap: Record<string, {SupplementSchedule: {Supplement: Supplement, time: string}[], JournalEntry: string}>){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[daySelected].SupplementSchedule).length > 0){
			if (selectedDatesCopy[stringDate] === undefined) {
				selectedDatesCopy[stringDate] = { dots:[{ key: "", color: "" }], selected: false };
			}
			if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 1){
				selectedDatesCopy[stringDate].dots.push(supplementDot);
			}
			selectedDatesCopy[stringDate].dots = removeEmptyDotObjects(selectedDatesCopy, stringDate);
		}
		setSelectedDates(selectedDatesCopy);
	}

	return(
		<View style={{ alignSelf: "center" }}>
			{ fontSizeNumber === 24 && <Text style={{ color: "white", fontSize: fontSizeNumber }}>Supplement Info</Text>} 
			<FlatList
				data={
					SupplementList.filter(post => {
						if (query === "") {
							return post;
						} else if (post.name.toLowerCase().includes(query.toLowerCase())) {
							return post;
						}
					})
				}
				renderItem={({ item, separators }) => (
					<TouchableHighlight
						key={item.name}
						onPress={() => addSupplement(item)}
						onShowUnderlay={separators.highlight}
						onHideUnderlay={separators.unhighlight}>
						<View>
							<Text style={fontSizeNumber === 24 ? styles.ListItem : styles.ListItemSmall}>{item.name}</Text>
						</View>
					</TouchableHighlight>
				)}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	ListItem: {
		fontSize: 24,
		fontWeight: "600",
		textAlign: "center",
		padding: 5,
		margin: 10,
		color: "white",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "orange",
		overflow:"hidden"
	},
	ListItemSmall: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
		padding: 5,
		margin: 10,
		color: "white",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "orange",
		overflow:"hidden"
	}
});
