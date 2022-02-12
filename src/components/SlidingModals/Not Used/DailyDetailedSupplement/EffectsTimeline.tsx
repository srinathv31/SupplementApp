// Source Imports
// Source Imports
import React from "react";
// import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function EffectsTimeline(): JSX.Element {
    return(
        <View></View>
    );
}
// import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
// import { TimeLineObject } from "../../../interfaces/TimeLine";
// import IconI from "react-native-vector-icons/Ionicons";
// import { EffectsFlatListProps, EffectsTimelineProps, TimelineStateProps } from "../../../interfaces/EffectsTimelineProps";
// import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
// import EffectsFlatList from "./EffectsFlatList";
// import createEffectTimeLine from "../../../utilities/timeline.ts/createEffectTimeLine";


// export default function EffectsTimeline({ expand, selectedSupplement, setSelectedSupplement, setSupplementMap, supplementMap, daySelected }: EffectsTimelineProps): JSX.Element {
//     const [timeLineArray, setTimeLineArray] = useState<Record<string, TimeLineObject[]>>(
//         { "1": selectedSupplement.TimelineData !== undefined ? selectedSupplement.TimelineData : [],
//             "2": selectedSupplement.TimelineData2 !== undefined ? selectedSupplement.TimelineData2 : [],
//             "3": selectedSupplement.TimelineData3 !== undefined ? selectedSupplement.TimelineData3 : []
//         }
//     );
//     const [timeLineArrayKey, setTimeLineArrayKey] = useState<string>("1");
//     const [timelineProps, setTimelineProps] = useState<Record<string, TimelineStateProps>>({
//         "1": { initialStart: 0, timelineColor: "red", colorEditMode: false, startSelected: false, editMoodMode: false },
//         "2": { initialStart: 0, timelineColor: "red", colorEditMode: false, startSelected: false, editMoodMode: false },
//         "3": { initialStart: 0, timelineColor: "red", colorEditMode: false, startSelected: false, editMoodMode: false },
//     });

//     const EffectsFlatListProps: EffectsFlatListProps = {
//         setTimeLineArray,
//         timeLineArray,
//         setTimelineProps,
//         timelineProps,
//         timeLineArrayKey,
//         setTimeLineArrayKey
//     };

//     const [timelineRenderList, setTimelineRenderList] = useState<{ renderList: JSX.Element }[]>([
//         { renderList: <EffectsFlatList {...EffectsFlatListProps}></EffectsFlatList> }
//     ]);

//     // Sets the starting point for each timeline
//     useEffect(() => {
//         const timelinePropsCopy = { ...timelineProps };
//         Object.keys(timeLineArray).forEach( key => {
//             Object.values(timeLineArray[key]).forEach( hour => {
//                 if (hour.start) {
//                     timelinePropsCopy[key].initialStart = timeLineArray[key].indexOf(hour);
//                     setTimelineProps(timelinePropsCopy);
//                 }
//             });
//         });
//     }, []);

//     // Removes the start if no end is selected on re-render
//     useEffect(() => {
//         Object.keys(timeLineArray).forEach( key => {
//             let startExist = false;
//             let endExist = false;
//             Object.values(timeLineArray[key]).forEach( hour => {
//                 if (hour.start) {
//                     startExist = true;
//                 }
//                 if (hour.end) {
//                     endExist = true;
//                 }
//             });
//             if (startExist && !endExist) {
//                 Object.values(timeLineArray[key]).forEach( hour => {
//                     if (hour.start) {
//                         delete hour.start;
//                         delete hour.color;
//                     }
//                 });
//             }
//         });
//     }, []);

//     // Checks if only a start is selected to prompt user to select endpoint for each timeline
//     useEffect(() => {
//         const timelinePropsCopy = { ...timelineProps };
//         Object.keys(timeLineArray).forEach( key => {
//             Object.values(timeLineArray[key]).forEach( hour => {
//                 if (hour.start) {
//                     timelinePropsCopy[key].startSelected = true;
//                     hour.color = timelinePropsCopy[key].timelineColor;
//                 }
//                 if (hour.end) {
//                     timelinePropsCopy[key].startSelected = false;
//                 }
//             });
//         });
//         setTimelineProps(timelinePropsCopy);
//     }, [timeLineArray]);

//     function chooseColor(colorString: "red" | "orange" | "#2196F3" | "#28c916") {
//         const timelinePropsCopy = { ...timelineProps };
//         timelinePropsCopy[timeLineArrayKey].timelineColor = colorString;
//         timelinePropsCopy[timeLineArrayKey].colorEditMode = false;
//         setTimelineProps(timelinePropsCopy);
        
//         createEffectTimeLine(timeLineArray[timeLineArrayKey][timelinePropsCopy[timeLineArrayKey].initialStart], timeLineArray, setTimeLineArray, timeLineArrayKey, timelinePropsCopy[timeLineArrayKey].timelineColor);
//     }

//     function addTimeLine() {
//         const timelineRenderListCopy = { ...timelineRenderList };
//         if (timelineRenderListCopy.length === 1) {
//             timelineRenderListCopy.push({ renderList: <EffectsFlatList {...EffectsFlatListProps}></EffectsFlatList> });
//             setTimelineRenderList(timelineRenderListCopy);
//             return;
//         }
//         if (timelineRenderListCopy.length === 2) {
//             timelineRenderListCopy.push({ renderList: <EffectsFlatList {...EffectsFlatListProps}></EffectsFlatList> });
//             setTimelineRenderList(timelineRenderListCopy);
//             return;
//         }
//     }

//     return(
//         <View style={{ flexDirection: "column", paddingBottom: expand === true ? 80 : 10 }}>
//             <EffectsFlatList {...EffectsFlatListProps} timeLineArrayKey="1"></EffectsFlatList>
//             <EffectsFlatList {...EffectsFlatListProps} timeLineArrayKey="2"></EffectsFlatList>
//             <EffectsFlatList {...EffectsFlatListProps} timeLineArrayKey="3"></EffectsFlatList>
            
//             { timeLineArray["3"] === [] && <IconI onPress={() => addTimeLine()}
//                 name={"add"} style={[styles.AddIconPadding]}/>}
//             { timelineProps[timeLineArrayKey].colorEditMode && <View style={{ flexDirection: "column" }}>
//                 <IconI onPress={() => chooseColor("red")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
//                 <IconI onPress={() => chooseColor("orange")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "orange" }]}></IconI>
//                 <IconI onPress={() => chooseColor("#2196F3")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#2196F3" }]}></IconI>
//                 <IconI onPress={() => chooseColor("#28c916")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
//             </View>}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     IconTimelinePadding: {
//         paddingHorizontal: 1,
//         fontSize: 18,
//         color: "#EEE",
//         alignSelf: "center",
//         marginTop: -11
//     },
//     IconPadding: {
//         paddingHorizontal: "50%",
//         paddingVertical: 5,
//         margin: 1,
//         fontSize: 18,
//         color: "#EEE"
//     },
//     AddIconPadding: {
//         paddingTop: 20,
//         fontSize: 18,
//         color: "silver",
//         textAlign: "center"
//     },
// });

