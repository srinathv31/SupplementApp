
interface CalendarDotObject {
    [date: string]: {
        dots: Dot[], selected: boolean
    }
}

interface Dot {
    key: string, 
    color: string
}

export default CalendarDotObject;
