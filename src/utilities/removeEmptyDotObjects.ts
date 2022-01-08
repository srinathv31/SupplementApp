import CalendarDotObject from "../interfaces/Calendar";
import { journalDot } from "./calendarDots";

export default function removeEmptyDotObjects(selectedDatesCopy: CalendarDotObject, dateString: string): [{key: string, color: string}] {
    // Delete Any Dates from the calendar dot object that have no dots
    Object.values(selectedDatesCopy[dateString].dots).forEach( dotObject => {
        if (dotObject.key === ""){
            selectedDatesCopy[dateString].dots = selectedDatesCopy[dateString].dots.filter(item => item !== dotObject) as [{key: string, color: string}];
        }
    });
    return selectedDatesCopy[dateString].dots;
}

export function removeJournalDot(selectedDatesCopy: CalendarDotObject, stringDate: string): [{key: string, color: string}] {
    if (selectedDatesCopy[stringDate] !== undefined) {
        selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item !== journalDot) as [{key: string, color: string}];
    }
    return selectedDatesCopy[stringDate].dots;
}

