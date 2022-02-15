// Source Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MoodTimelineSupplementProps } from "../../interfaces/MoodTimelineProps";
import MoodTimelineFlatlist from "./MoodTimelineFlatlist";
import IconI from "react-native-vector-icons/Ionicons";
import { TimeLineObject } from "../../interfaces/TimeLine";

export default function MoodTimlineSupplement({ supplementMap, daySelected, setSupplementMap, timelineData }: MoodTimelineSupplementProps): JSX.Element {
    const [colorEditMode, setColorEditMode] = useState<boolean>(false);
    const [colorString, setColorString] = useState<"red" | "orange" | "#2196F3" | "#28c916">("red");
    const [initialStart, setInitialStart] = useState<number>(grabInitialStart);
    const [startSelected, setStartSelected] = useState<boolean>(false);

    const radioButtons = [
        { id: 1, name: "radio-button-off-outline" },
        { id: 2, name: "radio-button-off-outline" },
        { id: 3, name: "radio-button-off-outline" },
        { id: 4, name: "radio-button-off-outline" },
        { id: 5, name: "radio-button-off-outline" }
    ];

    const data: TimeLineObject[] = [
        { time: "12:00 A" },
        { time: "01:00 A" },
        { time: "02:00 A" },
        { time: "03:00 A" },
        { time: "04:00 A" },
        { time: "05:00 A" },
        { time: "06:00 A" },
        { time: "07:00 A" },
        { time: "08:00 A" },
        { time: "09:00 A" },
        { time: "10:00 A" },
        { time: "11:00 A" },
        { time: "12:00 P" },
        { time: "01:00 P" },
        { time: "02:00 P" },
        { time: "03:00 P" },
        { time: "04:00 P" },
        { time: "05:00 P" },
        { time: "06:00 P" },
        { time: "07:00 P" },
        { time: "08:00 P" },
        { time: "09:00 P" },
        { time: "10:00 P" },
        { time: "11:00 P" },
        { time: "12:00 A" },
        { time: "01:00 A" },
        { time: "02:00 A" },
        { time: "03:00 A" },
        { time: "04:00 A" },
        { time: "05:00 A" },
        { time: "06:00 A" },
        { time: "07:00 A" },
    ];
    const [timelineState, setTimelineState] = useState<TimeLineObject[]>(
        timelineData.TimelineData !== [] ? 
        timelineData.TimelineData as TimeLineObject[] :
            data
    );

    const MoodTimelineProps = {
        setTimelineState,
        timelineState,
        colorString,
        setInitialStart,
        setColorEditMode,
        setStartSelected,
        startSelected,
        initialStart,
        colorEditMode,
        setSupplementMap,
        supplementMap,
        daySelected
    };
    // Checks if only a start is selected to prompt user to select endpoint for each timeline
    useEffect(() => {
        const timelineStateCopy: TimeLineObject[] = []; 
        Object.values(timelineState).forEach( hour => {
            timelineStateCopy.push(hour);
            if (hour.start === true) {
                setStartSelected(true);
            }
            if (hour.end === true) {
                setStartSelected(false);
            }
        });

    }, [timelineState]);
    
    function grabInitialStart() {
        const timelineDataCopy = timelineData.TimelineData;
        let index = 0;
        if (timelineDataCopy !== undefined) {
            Object.values(timelineDataCopy).forEach(time => {
                if (time.start === true){
                    index = timelineDataCopy.indexOf(time);
                }
            });
        }
        return index;
    }

    function chooseColor(colorString: "red" | "orange" | "#2196F3" | "#28c916") {
        const timelineStateCopy: TimeLineObject[] = []; 
        Object.values(timelineState).forEach( hour => {
            timelineStateCopy.push(hour);
        });

        setColorString(colorString);
        setColorEditMode(false);
     
        timelineStateCopy[initialStart].color = colorString;
        setTimelineState(timelineStateCopy);
    }

    useEffect(() => {
        let colorBuffer: "red" | "orange" | "#2196F3" | "#28c916" = "red";
        Object.values(timelineData.TimelineData).forEach(item => {
            if (item.color){
                colorBuffer = item.color;
            }
        });
        setColorString(colorBuffer);
    }, [timelineData]);
    
    return(
        <View>
            <View style={{ flexDirection: "row" }}>
                <MoodTimelineFlatlist {...MoodTimelineProps}/>
            </View>
            { colorEditMode && <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <IconI onPress={() => chooseColor("red")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "red" }]}></IconI>
                <IconI onPress={() => chooseColor("orange")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "orange" }]}></IconI>
                <IconI onPress={() => chooseColor("#2196F3")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "#2196F3" }]}></IconI>
                <IconI onPress={() => chooseColor("#28c916")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "#28c916" }]}></IconI>
            </View>}
            {timelineData.mood !== "" && <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 10 }}>
                {timelineData.mood + ": "}
                {radioButtons.map(item => {
                    return(
                        <IconI key={item.id} name={ timelineData.range < +item.id ? item.name : "radio-button-on-outline"} style={{ color: colorString }}></IconI>
                    );
                })}
            </Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    ColorIconPadding: {
        paddingTop: 20,
        margin: 1,
        fontSize: 18,
        color: "#EEE",
    }
});
