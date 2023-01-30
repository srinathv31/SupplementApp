// Source Imports
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import shallow from "zustand/shallow";
import { globalPropsContext } from "../../contextHooks/GlobalPropsContext";
import { generateWeekList, getDateString, grabMonth } from "../../utilities/getCurrentDate";
import handleCalendar from "../../utilities/handleCalendarEvents";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";

export default function MonthView(): JSX.Element {
    const { setUserData, userData } = useContext(globalPropsContext);

    const supplementMap = useClientStore(state => state.supplementMap);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const updateIndex = useClientStore(state => state.updateIndex);
    const updateDaySelected = useClientStore(state => state.updateDaySelected);
    const { objDaySelected, updateObjDaySelected } = useClientStore(state => ({ objDaySelected: state.objDaySelected, updateObjDaySelected: state.updateObjDaySelected }), shallow);
    const updateWeek = useClientStore(state => state.updateWeek);
    const updateMonthText = useClientStore(state => state.updateMonthText);

    function handleDayClick(day: DateData) {
        const userCopy = { ...userData };

        updateObjDaySelected(day);
        updateDaySelected(getDateString(day));

        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, day.dateString);
        setUserData(userCopy);
        saveUserData(userData, setUserData, supplementMap);

        updateWeek(generateWeekList(day));
        updateMonthText(grabMonth(generateWeekList(day)));
    }

    return(
        <View style={{ flex: 1 }}>
            <CalendarList
                style={styles.calendar}
                onDayPress={(day) => (handleDayClick(day), updateModalVisible("weekly-modal"))}
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
