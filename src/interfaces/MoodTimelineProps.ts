import ModalObject from "./Modal";
import MoodObject from "./Mood";
import { SupplementMapObject } from "./Supplement";
import { TimeLineObject } from "./TimeLine";

export interface MoodTimelineFlatlistProps {
    setTimelineState: (t: TimeLineObject[]) => void,
    timelineState: TimeLineObject[],
    colorString: "red" | "orange" | "#2196F3" | "#28c916",
    setInitialStart: (s: number) => void,
    initialStart: number,
    setColorEditMode: (b: boolean) => void,
    colorEditMode: boolean,
    setStartSelected: (b: boolean) => void
    startSelected: boolean,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    daySelected: string
}

export interface MoodTimelinePickerProps {
    daySelected: string,
    setModalVisible: (j: ModalObject) => void,
    modalVisible: ModalObject,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
}

export interface MoodTimelineSupplementProps {
    daySelected: string,
    setSupplementMap: (d: Record<string, SupplementMapObject>) => void,
    supplementMap: Record<string, SupplementMapObject>,
    timelineData: MoodObject
}
