// Source Imports
import React from "react";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { generatePrevDate } from "../../utilities/generateNextDate";
import handleCalendar from "../../utilities/handleCalendarEvents";

// Component Imports

// Design Imports

export default function PrevDayButton({ setDaySelected, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setDaySelected: (d: string) => void, 
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
}): JSX.Element {

	function grabPrevDay(day: DateData) {
		let copyDate = day;

		// Current Date Info to compare
		const date = day.day;
		const month = day.month;
		const year = day.year;

		// Based on month set max days - reset day to 31/30/(28/29)
		copyDate = generatePrevDate(copyDate, date, month, year);

		// Setting new date string
		let stringDay = ""+copyDate.day;
		let stringMonth = ""+copyDate.month;

		copyDate.day < 10 ? stringDay = ""+"0"+copyDate.day : stringDay = ""+copyDate.day;
		copyDate.month < 10 ? stringMonth = ""+"0"+copyDate.month : stringMonth = ""+copyDate.month;

		copyDate.dateString = ""+copyDate.year + "-" + stringMonth + "-" + stringDay;
        
		const selectedDatesCopy = handleCalendar(selectedDates, copyDate.dateString);
		setSelectedDates(selectedDatesCopy);

		setObjDaySelected(copyDate);

		return ""+copyDate.month + "/" + ""+copyDate.day + "/" + ""+copyDate.year;
	}
    
	return(
		<Icon
			onPress={() => setDaySelected(grabPrevDay(objDaySelected))}
			style={{ padding: 10,
				margin: 15,
				marginRight: 0,
				marginLeft: 0 }}
			name="chevron-left-circle" size={25} color="white"
		/>
	);
}
