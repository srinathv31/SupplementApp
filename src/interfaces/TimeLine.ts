
export interface TimeLineObject {
    time: string,
    start?: boolean,
    end?: boolean,
    passThrough?: boolean,
    event?: string,
    eventSum?: string,
    color?: "red" | "orange" | "skyblue" | "#28c916"
}
