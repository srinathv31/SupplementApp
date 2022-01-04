// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";
import { generateWeekList, getDateString, grabMonth } from "../../utilities/getCurrentDate";
import handleCalendar from "../../utilities/handleCalendarEvents";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected, setModalVisible, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates, setIndex, setPrevIndex, setWeek, setMonthText }: AppProps): JSX.Element {

	function handleDayClick(day: DateData) {

		setObjDaySelected(day);
		setDaySelected(getDateString(day));

		const selectedDatesCopy = handleCalendar(selectedDates, day.dateString);
		setSelectedDates(selectedDatesCopy);

		setWeek(generateWeekList(day));
		setMonthText(grabMonth(generateWeekList(day)));
	}

	return(
		<View style={{ flex: 1 }}>
			<CalendarList
				style={styles.calendar}
				onDayPress={(day) => (handleDayClick(day), setPrevIndex(0), setIndex(1))}
				onDayLongPress={(day) => (handleDayClick(day), setModalVisible("weekly-modal"))}
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
