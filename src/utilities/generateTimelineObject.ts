import { TimeLineObject } from "../interfaces/TimeLine";

export function generateTimelineObject(): TimeLineObject[] {
    const data: TimeLineObject[] = [ { time: "12:00 A" } ];
    for (let i=0;i<3;i++){
        for (let j=1;j<13;j++){
            let hour = `${j}`;
            let timeTag = i === 1 ? "P" : "A";
            if (i === 2 && j > 7){
                break;
            }
            if (j < 10) {
                hour = `0${j}`;
            }
            if (j === 12) {
                timeTag = timeTag === "A" ? "P" : "A";
            }
            data.push({ time: `${hour}:00 ${timeTag}` });
        }
    }
    return data;
}
