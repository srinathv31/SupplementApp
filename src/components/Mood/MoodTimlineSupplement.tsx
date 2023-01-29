// Source Imports
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MoodTimelineFlatlist from "./MoodTimelineFlatlist";
import IconI from "react-native-vector-icons/Ionicons";
import { TimeLineObject } from "../../interfaces/TimeLine";
import MoodObject from "../../interfaces/Mood";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { generateTimelineObject } from "../../utilities/generateTimelineObject";

// Component color select mode: DISABLED
export default function MoodTimlineSupplement({ timelineData, index }: {
    timelineData: MoodObject, index: number
}): JSX.Element {
    const { setSupplementMap, supplementMap, daySelected } = useContext(allPropsContext);

    const [colorEditMode, setColorEditMode] = useState<boolean>(false);
    const [colorString, setColorString] = useState<"red" | "orange" | "#2196F3" | "#28c916">("red");
    const [initialStart, setInitialStart] = useState<number>(grabInitialStart);
    const [startSelected, setStartSelected] = useState<boolean>(false);

    const moodColors = ["#28c916", "#2196F3", "orange"];

    const radioButtons = [
        { id: 1, name: "radio-button-off-outline" },
        { id: 2, name: "radio-button-off-outline" },
        { id: 3, name: "radio-button-off-outline" },
        { id: 4, name: "radio-button-off-outline" },
        { id: 5, name: "radio-button-off-outline" }
    ];

    const [timelineState, setTimelineState] = useState<TimeLineObject[]>(
        timelineData.TimelineData.length < 1 ? 
        timelineData.TimelineData as TimeLineObject[] :
            generateTimelineObject()
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
                        <IconI key={item.id} name={ timelineData.range < +item.id ? item.name : "radio-button-on-outline"} style={{ color: moodColors[index] }}></IconI>
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
