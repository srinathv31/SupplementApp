// Source Imports
import React from "react";
import { DateData } from "react-native-calendars/src/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import generateNextDate from "../../utilities/generateNextDate";

// Component Imports

// Design Imports

export default function NextDayButton({ setDaySelected, setObjDaySelected, objDaySelected }: {
    setDaySelected: (d: string) => void, 
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData
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
        copyDate.dateString = ""+copyDate.year + "-" + ""+copyDate.month + "-" + ""+copyDate.day;

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
