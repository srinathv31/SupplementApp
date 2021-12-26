import { DateData } from "react-native-calendars/src/types";

export default function getCurrentDate(): string {
    const currentDate = new Date();

    const day = ""+currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = ""+currentDate.getFullYear();

    return ""+month+"/"+day+"/"+year;
}

export function generateCurrentDateObject(): DateData {
    const currentDate = new Date();

    const month = currentDate.getMonth()+1;

    const DateObject: DateData = {
        year: currentDate.getFullYear(),
        month: month,
        day: currentDate.getDate(),
        timestamp: currentDate.getTime(),
        dateString: ""+currentDate.getFullYear() + "-" + ""+month + "-" + ""+currentDate.getDate()
    };

    return DateObject;
}
