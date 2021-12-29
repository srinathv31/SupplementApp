// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import SupplementList from "../../assets/SupplementList.json";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementListView({ setSupplementMap, supplementMap, fontSizeNumber, query, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    fontSizeNumber: number,
    query: string,
    daySelected: string,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
    objDaySelected: DateData
}): JSX.Element {

	function addSupplement(item: Supplement) {
		const supplementMapCopy = { ...supplementMap };
        
		if (supplementMapCopy[daySelected] === undefined){
			supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "" };
		}
        
		supplementMapCopy[daySelected].SupplementSchedule.push(item);
		addDate(objDaySelected, supplementMapCopy);
		Object.values(supplementMapCopy[daySelected].SupplementSchedule).forEach( supplement => {
			if (supplement === item) {
				supplement.time = "7:00AM";
			}
		});

		setSupplementMap(supplementMapCopy);

	}

	function addDate(day: DateData, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>){
		const selectedDatesCopy = { ...selectedDates };
		const stringDate = day.dateString;
		if (Object.values(supplementMap[daySelected].SupplementSchedule).length > 0){
			if (selectedDatesCopy[stringDate] === undefined) {
				selectedDatesCopy[stringDate] = { marked: false, selected: false };
			}
			selectedDatesCopy[stringDate].marked = true;
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
