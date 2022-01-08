import { DateData } from "react-native-calendars/src/types";
import { WeekDay } from "../interfaces/WeekDay";
import generateNextDate, { generatePrevDate } from "./generateNextDate";

export default function getCurrentDate(): string {
    const currentDate = new Date();

    const day = ""+currentDate.getDate();
    const month = currentDate.getMonth()+1;
    const year = ""+currentDate.getFullYear();

    return ""+month+"/"+day+"/"+year;
}

export function getDateString(day: DateData): string {
    return ""+day.month + "/" + ""+day.day + "/" + ""+day.year;
}

export function convertWeekDayToDateData(weekDay: WeekDay): DateData{
    const weekDayCopy = { ...weekDay };

    const month = getMonthString(weekDayCopy.month);
    const day = weekDayCopy.date;
    const year = weekDayCopy.year;
    const strDate = ""+month + " " + ""+day + "," + " " + ""+year; 
    const generatedDate = new Date(strDate);
    return generateDateObject(generatedDate);
}

export function generateCurrentDateObject(): DateData {
    const currentDate = new Date();
    return generateDateObject(currentDate);
}

export function generateDateObject(dayObj: Date): DateData {
    const currentDate = dayObj;

    const month = currentDate.getMonth()+1;
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    // Setting new date string
    let stringDay = ""+date;
    let stringMonth = ""+month;

    date < 10 ? stringDay = ""+"0"+date : stringDay = ""+date;
    month < 10 ? stringMonth = ""+"0"+month : stringMonth = ""+month;

    const newDateString = ""+year + "-" + stringMonth + "-" + stringDay;

    const DateObject: DateData = {
        year: year,
        month: month,
        day: date,
        timestamp: currentDate.getTime(),
        dateString: newDateString
    };

    return DateObject;
}

export function generateDateOrig(currentDate: DateData) {
    const currentDateCopy = { ...currentDate };

    const month = getMonthString(currentDateCopy.month);
    const day = currentDateCopy.day;
    const year = currentDateCopy.year;
    const strDate = ""+month + " " + ""+day + "," + " " + ""+year; 

    const generatedDate = new Date(strDate);
	
    return generatedDate;
}

export function generateWeekList(currentDate: DateData): WeekDay[] {
    const currentDateCopy: DateData = {
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day,
        timestamp: currentDate.timestamp,
        dateString: currentDate.dateString
    };
    const weekList: WeekDay[] = [];
    const generatedDate = generateDateOrig(currentDateCopy);


    if (generatedDate.getDay() === 0) {
        weekList.push({ day: grabWeekDay(0), date: currentDateCopy.day, month: currentDateCopy.month, year: currentDateCopy.year, dateString: getDateString(currentDateCopy) });
        for (let i=1; i<7; i++) {
            weekList[i] = { day: grabWeekDay(i), date: grabDay(currentDateCopy, currentDateCopy.day, currentDateCopy.month, currentDateCopy.year), month: currentDateCopy.month, year: currentDateCopy.year, dateString: getDateString(currentDateCopy) };
        }
    } else {
        const lowerBound = generatedDate.getDay();

        let prevSunday: DateData = {
            year: currentDateCopy.year,
            month: currentDateCopy.month,
            day: currentDateCopy.day,
            timestamp: currentDateCopy.timestamp,
            dateString: currentDateCopy.dateString
        };
        for (let i=0; i<lowerBound; i++){
            prevSunday = generatePrevDate(prevSunday, prevSunday.day, prevSunday.month, prevSunday.year);
        }
        weekList.push({ day: grabWeekDay(0), date: prevSunday.day, month: prevSunday.month, year: prevSunday.year, dateString: getDateString(prevSunday) });
        for (let i=1; i<7; i++) {
            weekList[i] = { day: grabWeekDay(i), date: grabDay(prevSunday, prevSunday.day, prevSunday.month, prevSunday.year), month: prevSunday.month, year: prevSunday.year, dateString: getDateString(prevSunday) };
        }
    }
    return weekList;
}

export function generatePrevWeek(weekList: WeekDay[]): WeekDay[]  {
    const currSunday: DateData = {
        year: weekList[0].year,
        month: weekList[0].month,
        day: weekList[0].date,
        dateString: weekList[0].dateString,
        timestamp: 0
    };
    let prevSunday = currSunday;
    for (let i=0; i<7; i++){
        prevSunday = generatePrevDate(currSunday, currSunday.day, weekList[0].month, weekList[0].year);
    }
    return generateWeekList(prevSunday);
}

export function generateNextWeek(weekList: WeekDay[]): WeekDay[]  {
    const currSaturday: DateData = {
        year: weekList[weekList.length - 1].year,
        month: weekList[weekList.length - 1].month,
        day: weekList[weekList.length - 1].date,
        dateString: weekList[weekList.length - 1].dateString,
        timestamp: 0
    };
    let nextSunday = currSaturday;
    nextSunday = generateNextDate(currSaturday, currSaturday.day, weekList[0].month, weekList[0].year);
	
    return generateWeekList(nextSunday);
}

function grabWeekDay(i: number): string {
    let weekDay = "";
    switch (i){
    case 0:
        weekDay = "Sun";
        break;
    case 1:
        weekDay =  "Mon";
        break;
    case 2:
        weekDay =  "Tues";
        break;
    case 3:
        weekDay =  "Wed";
        break;
    case 4:
        weekDay =  "Thurs";
        break;
    case 5:
        weekDay =  "Fri";
        break;
    case 6:
        weekDay =  "Sat";
        break;
    }
    return weekDay;
}

function grabDay(currentDate: DateData, day: number, month: number, year: number){
    const newDate = generateNextDate(currentDate, day, month, year);
    return newDate.day;
}

export function grabMonth(weekList: WeekDay[]): string {
    const firstDayMonth = getMonthString(weekList[0].month);
    const lastDayMonth = getMonthString(weekList[6].month);

    if (firstDayMonth !== lastDayMonth) {
        return firstDayMonth + "/" + lastDayMonth;
    }
    return firstDayMonth;
}

function getMonthString(month: number) {
    let monthString = "";
	
    switch(month) {
    case 1: 
        monthString = "Jan";
        break;
    case 2: 
        monthString = "Feb";
        break;
    case 3: 
        monthString = "Mar";
        break;
    case 4: 
        monthString = "Apr";
        break;
    case 5: 
        monthString = "May";
        break;
    case 6: 
        monthString = "Jun";
        break;
    case 7: 
        monthString = "Jul";
        break;
    case 8: 
        monthString = "Aug";
        break;
    case 9: 
        monthString = "Sep";
        break;
    case 10: 
        monthString = "Oct";
        break;
    case 11: 
        monthString = "Nov";
        break;
    case 12: 
        monthString = "Dec";
        break;
    }
    return monthString;
}
