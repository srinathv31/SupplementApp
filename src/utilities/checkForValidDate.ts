import { checkIfLeapYear } from "./generateNextDate";

export function checkIfValidDate(birthday: string) {
    let flag = true;
    const year = birthday.slice(6,10);
    const day = birthday.slice(3,5);
    const month = birthday.slice(0,2);
    const isLeapYear = checkIfLeapYear(+year);

    flag = checkEachMonth(month, day, isLeapYear);

    if (birthday.length !== 10 || year > "2021") {
        flag = false;
    }
    
    return flag;
}

function checkEachMonth(month: string, day: string, isLeapYear: boolean) {
    switch(month){
    case "04":
    case "06":
    case "09":
    case "11":
        if (day > "30") {
            return false;
        }
        break;
    case "02":
        // Check if leap year
        if (isLeapYear) {
            if (day > "29") {
                return false;
            }
        } 
        if (!isLeapYear){
            if (day > "28") {
                return false;
            }
        }
        break;
    }
    if (month > "12") {
        return false;
    }
    return true;
}
