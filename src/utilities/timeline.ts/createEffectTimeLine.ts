import { TimeLineObject } from "../../interfaces/TimeLine";

export default function createEffectTimeLine(item: TimeLineObject, timeLineUpdate: TimeLineObject[], setTimeLineUpdate: (t: TimeLineObject[]) => void, 
    colorStringStatus: "red" | "orange" | "#2196F3" | "#28c916") {
    const timeLineDataCopy: TimeLineObject[] = [];
    const doesStartExist = { index: 0, exist: false };
    const doesEndExist = { index: 0, exist: false };

    // Make copy of timelineData
    Object.values(timeLineUpdate).forEach( item => {
        timeLineDataCopy.push(item);
    });

    Object.values(timeLineDataCopy).forEach( hour => {
        if (hour.start) {
            doesStartExist.exist = true;
            doesStartExist.index = timeLineDataCopy.indexOf(hour);
            hour.color = colorStringStatus;
        }
        if (hour.end) {
            doesEndExist.exist = true;
            doesEndExist.index = timeLineDataCopy.indexOf(hour);
        }
    });

    if (!doesStartExist.exist && !doesEndExist.exist) {
        // Only set item as start
        Object.values(timeLineDataCopy).forEach( hour => {
            if (hour !== item) {
                delete hour.start;
            } else {
                hour.start = true;
            }
        });
        setTimeLineUpdate(timeLineDataCopy);
        return;
    }

    if (doesStartExist.exist && !doesEndExist.exist && !item.start && timeLineDataCopy.indexOf(item) > doesStartExist.index) {
        // Only set item as end
        Object.values(timeLineDataCopy).forEach( hour => {
            if (hour !== item) {
                delete hour.end;
            } else {
                hour.end = true;
                hour.color = colorStringStatus;
                doesEndExist.index = timeLineDataCopy.indexOf(hour);
            }
        });

        if (doesStartExist.index < doesEndExist.index) {
            // Set pass throughs
            Object.values(timeLineDataCopy).forEach( hour => {
                if (timeLineDataCopy.indexOf(hour) > doesStartExist.index && timeLineDataCopy.indexOf(hour) < doesEndExist.index) {
                    hour.passThrough = true;
                    hour.color = colorStringStatus;
                }
            });
        }
        
        /* This is not being used but should fix bug soon
        if (doesStartExist.index > doesEndExist.index) {
            // Set pass throughs
            Object.values(timeLineDataCopy).forEach( hour => {
                if (timeLineDataCopy.indexOf(hour) > doesStartExist.index) {
                    hour.passThrough = true;
                    hour.color = colorStringStatus;
                }
                if (timeLineDataCopy.indexOf(hour) < doesEndExist.index) {
                    hour.passThrough = true;
                    hour.color = colorStringStatus;
                }
            });
        } */
        setTimeLineUpdate(timeLineDataCopy);
        return;
    }

    if (doesStartExist.exist && doesEndExist.exist) {
        // Clear both start and end
        Object.values(timeLineDataCopy).forEach( hour => {
            delete hour.start;
            delete hour.end;
            delete hour.passThrough;
            delete hour.color;
            delete hour.event;
        });
        // Only set item as start
        Object.values(timeLineDataCopy).forEach( hour => {
            if (hour !== item) {
                delete hour.start;
            } else {
                hour.start = true;
            }
        });
        setTimeLineUpdate(timeLineDataCopy);
        return;
    }
}
