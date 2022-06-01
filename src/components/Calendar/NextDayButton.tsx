// Source Imports
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import generateNextDate from "../../utilities/generateNextDate";
import handleCalendar from "../../utilities/handleCalendarEvents";


export default function NextDayButton(): JSX.Element {
    const { setUserData, userData, setObjDaySelected, objDaySelected, setDaySelected, modalVisible } = useContext(allPropsContext);
    
    function grabNextDay(day: DateData) {
        const userCopy = { ...userData };
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

        copyDate.day < 10 ? stringDay = ""+"0"+copyDate.day : stringDay = ""+copyDate.day;
        copyDate.month < 10 ? stringMonth = ""+"0"+copyDate.month : stringMonth = ""+copyDate.month;

        copyDate.dateString = ""+copyDate.year + "-" + stringMonth + "-" + stringDay;

        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, copyDate.dateString);
        setUserData(userCopy);

        setObjDaySelected(copyDate);

        return ""+copyDate.month + "/" + ""+copyDate.day + "/" + ""+copyDate.year;
    }

    return(
        <>
            <Pressable 
                onPress={() => setDaySelected(grabNextDay(objDaySelected))}
                disabled={modalVisible.modal === "disable-header"}>
                <Icon
                    style={{ padding: 10,
                        margin: 15,
                        marginLeft: 0,
                        marginRight: 0 }}
                    name="chevron-right-circle" size={25} color="white"
                />
            </Pressable>
        </>
    );
}
