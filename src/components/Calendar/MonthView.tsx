// Source Imports
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Agenda, Calendar, CalendarList, WeekCalendar } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
import { DateData } from "react-native-calendars/src/types";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected }: {
    setDaySelected: (d: string) => void
}): JSX.Element {

    const selectedDatesInit: {[date: string]: {marked: boolean, selected: boolean}} = {
        '2021-12-23': 
            {
                marked: true,
                selected: true,
            }
    };

    const [selectedDates, setSelectedDates] = useState<{[date: string]: {marked: boolean, selected: boolean}}>(selectedDatesInit);

    function handleDayClick(day: DateData) {
        setDaySelected(dayToString(day));
        addDate(day);
    }

    function dayToString(day: DateData) {
        return ""+day.month + "/" + ""+day.day + "/" + ""+day.year;
    }

    function addDate(day: DateData){
        const selectedDatesCopy = {...selectedDates};
        const stringDate = day.dateString;
        selectedDatesCopy[stringDate] = {marked: true, selected: true};
        setSelectedDates(selectedDatesCopy);
    }

    return(
        <View style={{flex: 1}}>
            <CalendarList
                style={styles.calendar}
                // onDayPress={(day) => handleDayClick(day)}
                onDayPress={(day) => handleDayClick(day)}
                markingType={'dot'}
                markedDates={selectedDates}
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
