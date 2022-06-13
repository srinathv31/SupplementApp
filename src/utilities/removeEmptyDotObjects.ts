import CalendarDotObject from "../interfaces/Calendar";

export default function removeEmptyDotObjects(selectedDatesCopy: CalendarDotObject, dateString: string): [{key: string, color: string}] {
    // Delete Any Dates from the calendar dot object that have no dots
    Object.values(selectedDatesCopy[dateString].dots).forEach( dotObject => {
        if (dotObject.key === ""){
            selectedDatesCopy[dateString].dots = selectedDatesCopy[dateString].dots.filter(item => item !== dotObject) as [{key: string, color: string}];
        }
    });
    return selectedDatesCopy[dateString].dots;
}
