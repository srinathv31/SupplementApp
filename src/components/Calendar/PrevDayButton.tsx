// Source Imports
import React from "react";
import { Pressable } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppProps } from "../../interfaces/Props";
import { generatePrevDate } from "../../utilities/generateNextDate";
import handleCalendar from "../../utilities/handleCalendarEvents";


export default function PrevDayButton({ userData, setUserData, setDaySelected, setObjDaySelected, objDaySelected, modalVisible }: AppProps): JSX.Element {

    function grabPrevDay(day: DateData) {
        const userCopy = { ...userData };
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
        
        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, copyDate.dateString);
        setUserData(userCopy);

        setObjDaySelected(copyDate);

        return ""+copyDate.month + "/" + ""+copyDate.day + "/" + ""+copyDate.year;
    }
    
    return(
        <>
            <Pressable 
                onPress={() => setDaySelected(grabPrevDay(objDaySelected))}
                disabled={modalVisible.modal === "disable-header"}>
                <Icon
                    style={{ padding: 10,
                        margin: 15,
                        marginRight: 0,
                        marginLeft: 0 }}
                    name="chevron-left-circle" size={25} color="white"
                />
            </Pressable>
        </>
    );
}
