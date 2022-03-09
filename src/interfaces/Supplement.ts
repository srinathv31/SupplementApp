import MoodObject from "./Mood";
interface Supplement {
    name: string,
    smallDescription: string,
    // description: string,
    // benefits: string,
    // safe: string,
    // sideEffects: string,
    url: string
    dosageMetric: string
}

export interface SupplementObject {
    Supplement: Supplement,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time",
    takenOffTime?: string,
    note?: string,
    dosage?: string
}

export interface SupplementMapObject {
    SupplementSchedule: SupplementObject[], 
    JournalEntry: string,
    DailyMood: Record<string, MoodObject>,
}


export default Supplement;
