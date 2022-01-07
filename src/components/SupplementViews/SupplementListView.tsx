// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";
import Supplement, { SupplementMapObject } from "../../interfaces/Supplement";
import { supplementDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import sortDailyList from "../../utilities/sortDailyList";
import SupplementList from "../../assets/SupplementList.json";


export default function SupplementListView({ fontSizeNumber, query, setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected, setSelectedSupplement, multipleAddMode, setModalVisible, index }: {
    fontSizeNumber: number,
	query: string,
	setSupplementMap: AppProps["setSupplementMap"], supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"], 
	setSelectedDates: AppProps["setSelectedDates"], selectedDates: AppProps["selectedDates"], objDaySelected: AppProps["objDaySelected"],
	setSelectedSupplement: AppProps["setSelectedSupplement"], multipleAddMode: AppProps["multipleAddMode"], setModalVisible: AppProps["setModalVisible"],
	index: AppProps["index"]
}): JSX.Element {

	function addSupplement(item: Supplement) {
		const supplementMapCopy = { ...supplementMap };
        
		if (supplementMapCopy[daySelected] === undefined){
			supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "" };
		}
        
		supplementMapCopy[daySelected].SupplementSchedule.push({ Supplement: item, time: "", taken: "not-taken" });
		addDate(objDaySelected, supplementMapCopy);

		supplementMapCopy[daySelected].SupplementSchedule = sortDailyList(supplementMapCopy[daySelected].SupplementSchedule);

		setSupplementMap(supplementMapCopy);
	}

	function addDate(day: DateData, supplementMap: Record<string, SupplementMapObject>){
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

	function expandSupplement(item: Supplement) {
		setSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" });
		setModalVisible({ modal: "info-modal" });
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
				renderItem={({ item }) => (
					<TouchableOpacity
						key={item.name}
						onPress={ 
							multipleAddMode ? () => (setSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" }), setModalVisible({ modal: "time-modal" }))
								: index === 2 ? () => expandSupplement(item) : () => addSupplement(item)
						}
					>
						<View>
							<Text style={fontSizeNumber === 24 ? styles.ListItem : styles.ListItemSmall}>{item.name}</Text>
						</View>
					</TouchableOpacity>
				)}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	ListItem: {
		fontSize: 24,
		textAlign: "center",
		padding: 10,
		margin: 10,
		borderRadius: 5,
		backgroundColor: "#112442",
		overflow:"hidden",
		flexDirection: "row",
		justifyContent: "space-evenly",
		color: "white"
	},
	ListItemSmall: {
		fontSize: 20,
		fontWeight: "500",
		textAlign: "center",
		padding: 5,
		margin: 10,
		color: "white",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#112442",
		overflow:"hidden"
	}
});
