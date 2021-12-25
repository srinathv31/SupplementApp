// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { Agenda, Calendar, CalendarList, WeekCalendar } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
import { DateData } from "react-native-calendars/src/types";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected }: {
    setDaySelected: (d: string) => void
}): JSX.Element {

    function dayToString(day: DateData) {
        return ""+day.month + "/" + ""+day.day + "/" + ""+day.year;
    }

    return(
        <View style={{flex: 1}}>
            <CalendarList
                style={styles.calendar}
                onDayPress={(day) => setDaySelected(dayToString(day))}
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
