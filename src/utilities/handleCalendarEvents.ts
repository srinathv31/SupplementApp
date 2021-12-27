
export default function handleCalendar(selectedDates: {[date: string]: {marked: boolean, selected: boolean}}, dateString: string): {[date: string]: {marked: boolean, selected: boolean}} {
    const selectedDatesCopy = {...selectedDates};

    // Delete Each Date from the Object that has no Values
    Object.keys(selectedDatesCopy).forEach(date => {
        if (selectedDatesCopy[date].marked === false) {
            delete selectedDatesCopy[date];
        }
    });
    // Set only the selected date to have the blue circle
    Object.keys(selectedDatesCopy).forEach(date => {
        dateString === date ? selectedDatesCopy[date].selected = true : selectedDatesCopy[date].selected = false;
    });

    // Create a new marking object for the date if one doesn't exist
    selectedDatesCopy[dateString] !== undefined ? selectedDatesCopy[dateString] = {marked: true, selected: true} : selectedDatesCopy[dateString] = {marked: false, selected: true}

    return selectedDatesCopy;
}
