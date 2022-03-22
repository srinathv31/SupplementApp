import { SupplementObject } from "../interfaces/Supplement";

export default function convertDateTimeToStringTime(currentDate: Date) {
    let timeTag = "AM";
    let hour = ""+currentDate.getHours();
    let minutes = ""+currentDate.getMinutes();
    if (currentDate.getHours() > 11) {
        timeTag = "PM";
        if (currentDate.getHours() > 12) {
            const hourTmp = currentDate.getHours() - 12;
            hour = ""+hourTmp;
        }
    }
    if (currentDate.getHours() === 0) {
        hour = "12";
    }
    if (currentDate.getMinutes() < 10) {
        minutes = "0"+ ""+currentDate.getMinutes();
    }

    // 12:32_PM
    // 12345678
    return hour + ":" + minutes + " " + ""+timeTag;
}

export function convertStringTimeToDateTime(supplement: SupplementObject, daySelected: string) {
    const supplementCopy = { ...supplement };
    let daySelectedCopy = daySelected.slice();

    // Set time strings to same length
    if (supplementCopy.time.length === 7) {
        supplementCopy.time = "0"+supplementCopy.time;
    }
    // Set date strings to same length
    if (daySelectedCopy.length === 9) {
        daySelectedCopy = "0"+daySelectedCopy;
    }

    // Set the hours in military format
    if (supplementCopy.time.substring(6,8) === "PM" && supplementCopy.time.substring(0,2) !== "12") {
        const militaryHour = +supplementCopy.time.substring(0,2) + 12;
        const stringMinute = supplementCopy.time.substring(3,5);
        const timeTagString = supplementCopy.time.substring(6,8);
        supplementCopy.time = ""+militaryHour + ":" + stringMinute + timeTagString;
    }

    const time = supplementCopy.time.substring(0,5);

    const year = daySelected.substring(5,9);
    const day = daySelected.substring(2,4);
    const month = daySelectedCopy.substring(0,2);
    
    return new Date(`${year}-${month}-${day}T${time}:00`);
}
