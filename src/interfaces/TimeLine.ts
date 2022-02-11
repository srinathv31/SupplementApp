import MoodObject from "./Mood";

export interface TimeLineObject {
    time: string, // [time: 7:00PM]
    start?: boolean,
    end?: boolean,
    passThrough?: boolean,
    mood?: MoodObject // [happy: 50, calm: 70, relax: 60],
    color?: "red" | "orange" | "#2196F3" | "#28c916"
}
