interface Supplement {
    name: string,
    description: string,
}

export interface SupplementObject {
    Supplement: Supplement,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time"
}

export interface SupplementMapObject {
    SupplementSchedule: SupplementObject[], 
    JournalEntry: string
}


export default Supplement;
