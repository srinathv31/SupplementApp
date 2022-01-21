import MoodObject from "./Mood";
import { TimeLineObject } from "./TimeLine";
interface Supplement {
    name: string,
    smallDescription: string,
    description: string,
    benefits: string,
    safe: string,
    sideEffects: string,
    url: string
}

export interface SupplementObject {
    Supplement: Supplement,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time",
    takenOffTime?: string,
    note?: string,
    TimelineData?: TimeLineObject[]
}

export interface SupplementMapObject {
    SupplementSchedule: SupplementObject[], 
    JournalEntry: string,
    DailyMood: MoodObject
}


export default Supplement;
