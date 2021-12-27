// Source Imports
import React from "react";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import generateNextDate from "../../utilities/generateNextDate";
import handleCalendar from "../../utilities/handleCalendarEvents";

// Component Imports

// Design Imports

export default function NextDayButton({ setDaySelected, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setDaySelected: (d: string) => void, 
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData,
    setSelectedDates: (s: {[date: string]: {marked: boolean, selected: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean, selected: boolean}},
}): JSX.Element {

    function grabNextDay(day: DateData) {
        let copyDate = day;

        // Current Date Info to compare
        const date = day.day;
        const month = day.month;
        const year = day.year;

        // Based on month set max days - reset day to 1
        copyDate = generateNextDate(copyDate, date, month, year);

        // Setting new date string
        let stringDay = ""+copyDate.day;
        let stringMonth = ""+copyDate.month;

        copyDate.day < 10 ? stringDay = ""+"0"+copyDate.day : stringDay = stringDay;
        copyDate.month < 10 ? stringMonth = ""+"0"+copyDate.month : stringMonth = stringMonth;

        copyDate.dateString = ""+copyDate.year + "-" + stringMonth + "-" + stringDay;

        const selectedDatesCopy = handleCalendar(selectedDates, copyDate.dateString);
        setSelectedDates(selectedDatesCopy);

        setObjDaySelected(copyDate);

        return ""+copyDate.month + "/" + ""+copyDate.day + "/" + ""+copyDate.year;
    }

    return(
        <Icon
        onPress={() => setDaySelected(grabNextDay(objDaySelected))}
        style={{padding: 10,
            margin: 15,
            marginLeft: 0,
            marginRight: 0}}
            name="chevron-right-circle" size={25} color="white"
        />
    );
}
