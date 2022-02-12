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
    setTimeLineArray: (t: Record<string, TimeLineObject[]>) => void,
    timeLineArray: Record<string, TimeLineObject[]>,
    timeLineArrayKey: string,
    setTimeLineArrayKey: (k: string) => void,
    setTimelineProps: (t: Record<string, TimelineStateProps>) => void,
    timelineProps: Record<string, TimelineStateProps>
}

export interface TimelineStateProps {
    initialStart: number,
    timelineColor: "red" | "orange" | "#2196F3" | "#28c916",
    colorEditMode: boolean,
    startSelected: boolean,
    editMoodMode: boolean
}
