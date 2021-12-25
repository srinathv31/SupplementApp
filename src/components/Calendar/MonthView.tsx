// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { Agenda, Calendar, CalendarList, WeekCalendar } from "react-native-calendars";

// Component Imports

// Design Imports

export default function MonthView(): JSX.Element {

    

    return(
        <View style={{flex: 1}}>
            <CalendarList
                style={styles.calendar}
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
