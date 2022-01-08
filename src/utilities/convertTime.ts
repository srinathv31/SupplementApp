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

export function convertStringTimeToDateTime(supplement: SupplementObject) {
	
    // Set time strings to same length
    if (supplement.time.length === 7) {
        supplement.time = "0"+supplement.time;
    }

    const time = supplement.time.substring(0,5);
	
    return new Date("2019-05-17T"+ time +":00");

}
