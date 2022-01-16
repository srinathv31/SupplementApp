import MoodObject from "./Mood";
interface Supplement {
    name: string,
    smallDescription: string,
    description: string,
    benefits: string,
    safe: string,
    sideEffects: string
}

export interface SupplementObject {
    Supplement: Supplement,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time"
}

export interface SupplementMapObject {
    SupplementSchedule: SupplementObject[], 
    JournalEntry: string,
    DailyMood: MoodObject
}


export default Supplement;
