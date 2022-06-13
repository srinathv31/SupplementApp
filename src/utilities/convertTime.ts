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

    // Making all Date Strings the same length
    // First append "0" to month if single-digit
    let firstSlashIndex = daySelectedCopy.indexOf("/");
    if (firstSlashIndex === 1) {
        daySelectedCopy = "0"+daySelectedCopy;
    }
    // Append "0" to date if single-digit
    firstSlashIndex = daySelectedCopy.indexOf("/");
    const secondSlashIndex = daySelectedCopy.indexOf("/", firstSlashIndex + 1);
    if (secondSlashIndex - firstSlashIndex === 2) {
        daySelectedCopy = daySelectedCopy.slice(0, firstSlashIndex+1) + "0" + daySelectedCopy.slice(firstSlashIndex+1);
    }
    const year = daySelectedCopy.substring(6,10);
    const day = daySelectedCopy.substring(3,5);
    const month = daySelectedCopy.substring(0,2);

    // Set the hours in military format
    if (supplementCopy.time.substring(6,8) === "PM" && supplementCopy.time.substring(0,2) !== "12") {
        const militaryHour = +supplementCopy.time.substring(0,2) + 12;
        const stringMinute = supplementCopy.time.substring(3,5);
        const timeTagString = supplementCopy.time.substring(6,8);
        supplementCopy.time = ""+militaryHour + ":" + stringMinute + timeTagString;
    }
    const time = supplementCopy.time.substring(0,5);

    return new Date(`${year}-${month}-${day}T${time}:00`);
}
