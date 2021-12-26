// Source Imports
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Agenda, Calendar, CalendarList, WeekCalendar } from "react-native-calendars";
import Day from "react-native-calendars/src/calendar/day";
import { DateData } from "react-native-calendars/src/types";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function MonthView({ setDaySelected, setModalVisible, setVisiblePage, setObjDaySelected, objDaySelected,setSelectedDates, selectedDates, supplementMap }: {
    setDaySelected: (d: string) => void,
    setModalVisible: (m: string) => void,
    setVisiblePage: (v: string) => void,
    setObjDaySelected: (d: DateData) => void, objDaySelected: DateData,
    setSelectedDates: (s: {[date: string]: {marked: boolean}}) => void, selectedDates: {[date: string]: {marked: boolean}},
    supplementMap: Record<string, Supplement[]>
}): JSX.Element {

    function handleDayClick(day: DateData) {
        setObjDaySelected(day);
        setDaySelected(dayToString(day));
        // addDate(day);
    }

    function dayToString(day: DateData) {
        return ""+day.month + "/" + ""+day.day + "/" + ""+day.year;
    }

    // function addDate(day: DateData){
    //     const selectedDatesCopy = {...selectedDates};
    //     const stringDate = day.dateString;
    //     if (supplementMap[dayToString(day)] !== undefined && Object.values(supplementMap[dayToString(day)]).length > 0){
    //         selectedDatesCopy[stringDate] = {marked: true};
    //     }
    //     setSelectedDates(selectedDatesCopy);
    // }

    return(
        <View style={{flex: 1}}>
            <CalendarList
                style={styles.calendar}
                onDayPress={(day) => (handleDayClick(day), setVisiblePage("1"))}
                onDayLongPress={(day) => (handleDayClick(day), setModalVisible("3"))}
                markingType={'dot'}
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
