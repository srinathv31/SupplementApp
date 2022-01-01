// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";
import handleCalendar from "../../utilities/handleCalendarEvents";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected, setModalVisible, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates, setIndex, setPrevIndex }: AppProps): JSX.Element {

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
				onDayPress={(day) => (handleDayClick(day), setPrevIndex(0), setIndex(1))}
				onDayLongPress={(day) => (handleDayClick(day), setModalVisible("daily-modal"))}
				markingType={"multi-dot"}
				markedDates={selectedDates}
				current={objDaySelected.dateString}
				theme={{
					calendarBackground: "#0B172A",
					textColor: "white",
					arrowColor: "white",
					dayTextColor: "white",
					monthTextColor: "white"
				}}
			></CalendarList>
		</View>
	);
}

const styles = StyleSheet.create({
	calendar: {
		height: "95%",
	}
});
