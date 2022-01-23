import { SupplementMapObject, SupplementObject } from "./Supplement";
import { TimeLineObject } from "./TimeLine";

export interface EffectsTimelineProps {
    expand: boolean,
    selectedSupplement: SupplementObject,
    setSelectedSupplement: (s: SupplementObject) => void,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    daySelected: string
}

export interface EffectsFlatListProps {
    setTimeLineUpdate: (t: TimeLineObject[]) => void,
    timeLineUpdate: TimeLineObject[],
    setEditTextMode: (e: boolean) => void,
    editTextMode: boolean,
    startSelected: boolean,
    setInitialStart: (i: number) => void,
    initialStart: number,
    setColorEditMode: (e: boolean) => void,
    colorEditMode: boolean,
    colorStringStatus: "red" | "orange" | "#2196F3" | "#28c916"
}
