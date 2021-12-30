import removeEmptyDotObjects from "./removeEmptyDotObjects";

export default function handleCalendar(selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}, dateString: string): {[date: string]: {dots: [{key: string, color: string}], selected: boolean}} {
	const selectedDatesCopy = { ...selectedDates };

	// Delete Each Date from the Object that has no Values
	Object.keys(selectedDatesCopy).forEach(date => {
		if (Object.values(selectedDatesCopy[date].dots).length === 0) {
			delete selectedDatesCopy[date];
		}
	});
	// Set only the selected date to have the blue circle
	Object.keys(selectedDatesCopy).forEach(date => {
		dateString === date ? selectedDatesCopy[date].selected = true : selectedDatesCopy[date].selected = false;
	});

	// Create a new marking object for the date if one doesn't exist
	selectedDatesCopy[dateString] !== undefined ? selectedDatesCopy[dateString].selected = true : selectedDatesCopy[dateString] = { dots: [{ key: "", color: "" }], selected: true };

	// Delete Any Dates from the calendar dot object that have no dots
	selectedDatesCopy[dateString].dots = removeEmptyDotObjects(selectedDatesCopy, dateString);

	return selectedDatesCopy;
}
