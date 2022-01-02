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
	const month = weekDay.month;
	const day = weekDay.date;
	const year = weekDay.year;
	const strDate = ""+month + " " + ""+day + "," + " " + ""+year; 
	const generatedDate = new Date(strDate);
	return generateDateObject(generatedDate);
}

export function generateCurrentDateObject(): DateData {
	const currentDate = new Date();
	return generateDateObject(currentDate);
}

export function generateDateObject(day: Date): DateData {
	const currentDate = day;

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

// function generateDateOrig(currentDate: DateData) {
// 	const month = currentDate.month;
// 	const day = currentDate.day;
// 	const year = currentDate.year;
// 	const strDate = ""+month + " " + ""+day + "," + " " + ""+year; 

// 	const generatedDate = new Date(strDate);
	
// 	return generatedDate;
// }

export function generateWeek(currentDate: DateData): WeekDay[] {
	const month = currentDate.month;
	const day = currentDate.day;
	const year = currentDate.year;
	const strDate = ""+month + " " + ""+day + "," + " " + ""+year; 

	const generatedDate = new Date(strDate);
	
	const weekList = generateWeekList(generatedDate);
	return weekList;
}

function generateWeekList(generatedDate: Date) {
	const weekList: WeekDay[] = [];
	const currentDate = generateDateObject(generatedDate);

	if (generatedDate.getDay() === 0) {
		weekList.push({ day: grabWeekDay(0), date: currentDate.day, month: currentDate.month, year: currentDate.year, dateString: getDateString(currentDate) });
		for (let i=1; i<7; i++) {
			weekList[i] = { day: grabWeekDay(i), date: grabDay(currentDate, currentDate.day, currentDate.month, currentDate.year), month: currentDate.month, year: currentDate.year, dateString: getDateString(currentDate) };
		}
	} else {
		const lowerBound = generatedDate.getDay();

		let prevSunday = currentDate;
		for (let i=0; i<lowerBound; i++){
			prevSunday = generatePrevDate(currentDate, currentDate.day, currentDate.month, currentDate.year);
		}
		return generateWeek(prevSunday);
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
	return generateWeek(prevSunday);
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
	
	return generateWeek(nextSunday);
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
