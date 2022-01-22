
export interface TimeLineObject {
    time: string,
    start?: boolean,
    end?: boolean,
    passThrough?: boolean,
    event?: string,
    eventSum?: string,
    color?: "red" | "orange" | "#2196F3" | "#28c916"
}
