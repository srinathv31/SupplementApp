// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import handleCalendar from "../../utilities/handleCalendarEvents";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected, setModalVisible, setVisiblePage, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setDaySelected: (d: string) => void,
    setModalVisible: (m: string) => void,
    setVisiblePage: (v: string) => void,
    setObjDaySelected: (d: DateData) => void, objDaySelected: DateData,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
}): JSX.Element {

	function handleDayClick(day: DateData) {

		setObjDaySelected(day);
		setDaySelected(dayToString(day));

		const selectedDatesCopy = handleCalendar(selectedDates, day.dateString);
		setSelectedDates(selectedDatesCopy);
	}

	function dayToString(day: DateData) {
		return ""+day.month + "/" + ""+day.day + "/" + ""+day.year;
	}

	return(
		<View style={{ flex: 1 }}>
			<CalendarList
				style={styles.calendar}
				onDayPress={(day) => (handleDayClick(day), setVisiblePage("1"))}
				onDayLongPress={(day) => (handleDayClick(day), setModalVisible("3"))}
				markingType={"multi-dot"}
				markedDates={selectedDates}
				current={objDaySelected.dateString}
			></CalendarList>
		</View>
	);
}

const styles = StyleSheet.create({
	calendar: {
		height: "85%",
		marginTop: 50
	}
});
