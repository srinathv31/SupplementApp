import { DateData } from "react-native-calendars/src/types";

export default function generateNextDate(copyDate: DateData, date: number, month: number, year: number): DateData {
    const isLeapYear = checkIfLeapYear(year);
    
    // Based on month set max days - reset day to 1
    switch(month){
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        if (date === 31) {
            copyDate.day = 1;
            // If it's Dec go to Jan
            if (month === 12){
                copyDate.month = 1;
                copyDate.year++;
            } else {
                copyDate.month++;
            }
        } else {
            copyDate.day++;
        }
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        if (date === 30) {
            copyDate.day = 1;
            // Move to the next month
            copyDate.month++;
        } else {
            copyDate.day++;
        }
        break;
    case 2:
        // Check if leap year
        if (isLeapYear) {
            if (date === 29) {
                copyDate.day = 1;
                copyDate.month++;
            } else {
                copyDate.day++;
            }
        } 
        if (!isLeapYear){
            if (date === 28) {
                copyDate.day = 1;
                copyDate.month++;
            } else {
                copyDate.day++;
            }
        }
        break;
    }
    return copyDate;
}

export function generatePrevDate(copyDate: DateData, date: number, month: number, year: number): DateData {
    const isLeapYear = checkIfLeapYear(year);
    
    // Based on month set max days - reset day to 31/30/(28/29)
    switch(month){
    case 1:
        if (date === 1) {
            // Go back to prev year
            copyDate.day = 31;
            copyDate.month = 12;
            copyDate.year--;
        } else {
            copyDate.day--;
        }
        break;
    case 3:
        if (date === 1) {
            if (isLeapYear) {
                copyDate.day = 29;
                copyDate.month--;
            } else {
                copyDate.day = 28;
                copyDate.month--;
            }
        } else {
            copyDate.day--;
        }
        break;
    case 8:
        if (date === 1) {
            copyDate.day = 31;
            copyDate.month--;
        } else {
            copyDate.day--;
        }
        break;
    case 5:
    case 7:
    case 10:
    case 12:
        if (date === 1) {
            copyDate.day = 30;
            copyDate.month--;
        } else {
            copyDate.day--;
        }
        break;
    case 2:
    case 4:
    case 6:
    case 9:
    case 11:
        if (date === 1) {
            copyDate.day = 31;
            copyDate.month--;
        } else {
            copyDate.day--;
        }
        break;
    }
    return copyDate;
}

function checkIfLeapYear(year: number): boolean {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}
