// Source Imports
import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";
import { generateWeekList, getDateString, grabMonth } from "../../utilities/getCurrentDate";
import handleCalendar from "../../utilities/handleCalendarEvents";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";


export default function MonthView({ setUserData, userData, supplementMap, setDaySelected, setModalVisible, setObjDaySelected, objDaySelected, setIndex, setPrevIndex, setWeek, setMonthText }: AppProps): JSX.Element {

    function handleDayClick(day: DateData) {
        const userCopy = { ...userData };

        setObjDaySelected(day);
        setDaySelected(getDateString(day));

        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, day.dateString);
        setUserData(userCopy);
        saveUserData(userData, setUserData, supplementMap);

        setWeek(generateWeekList(day));
        setMonthText(grabMonth(generateWeekList(day)));
    }

    return(
        <View style={{ flex: 1 }}>
            <CalendarList
                style={styles.calendar}
                onDayPress={(day) => (handleDayClick(day), setModalVisible({ modal: "weekly-modal" }))}
                onDayLongPress={(day) => (handleDayClick(day), setPrevIndex(0), setIndex(1))}
                markingType={"multi-dot"}
                markedDates={userData.data.selectedDates}
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
