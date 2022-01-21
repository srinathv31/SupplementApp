import { SupplementMapObject, SupplementObject } from "./Supplement";

export interface EffectsTimelineProps {
    expand: boolean,
    selectedSupplement: SupplementObject,
    setSelectedSupplement: (s: SupplementObject) => void,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    daySelected: string
}

