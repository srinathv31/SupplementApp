// Source Imports
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { generateWeekList, getDateString, grabMonth } from "../../utilities/getCurrentDate";
import handleCalendar from "../../utilities/handleCalendarEvents";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";


export default function MonthView(): JSX.Element {
    const { setUserData, userData, setObjDaySelected, objDaySelected, setDaySelected, setWeek, setMonthText, supplementMap, setModalVisible } = useContext(allPropsContext);

    const updateIndex = useClientStore(state => state.updateIndex);

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
                onDayPress={(day) => (handleDayClick(day), setModalVisible("weekly-modal"))}
                onDayLongPress={(day) => (handleDayClick(day), updateIndex(1))}
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
