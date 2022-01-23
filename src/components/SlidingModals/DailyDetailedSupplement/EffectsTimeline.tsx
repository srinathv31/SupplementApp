// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { TimeLineObject } from "../../../interfaces/TimeLine";
import IconI from "react-native-vector-icons/Ionicons";
import { EffectsFlatListProps, EffectsTimelineProps } from "../../../interfaces/EffectsTimelineProps";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import EffectsFlatList from "./EffectsFlatList";
import createEffectTimeLine from "../../../utilities/timeline.ts/createEffectTimeLine";


export default function EffectsTimeline({ expand, selectedSupplement, setSelectedSupplement, setSupplementMap, supplementMap, daySelected }: EffectsTimelineProps): JSX.Element {
    const [timeLineUpdate, setTimeLineUpdate] = useState<TimeLineObject[]>(selectedSupplement.TimelineData !== undefined ? selectedSupplement.TimelineData : []);
    const [initialStart, setInitialStart] = useState<number>(0);
    const [colorStringStatus, setColorStringStatus] = useState<"red" | "orange" | "#2196F3" | "#28c916">("red");
    const [colorEditMode, setColorEditMode] = useState<boolean>(false);
    const [startSelected, setStartSelected] = useState<boolean>(false);
    const [editTextMode, setEditTextMode] = useState<boolean>(false);

    const EffectsFlatListProps: EffectsFlatListProps = {
        setTimeLineUpdate,
        timeLineUpdate,
        setEditTextMode,
        editTextMode,
        startSelected,
        setInitialStart,
        initialStart,
        setColorEditMode,
        colorEditMode,
        colorStringStatus
    };

    useEffect(() => {
        Object.values(timeLineUpdate).forEach( hour => {
            if (hour.start) {
                setInitialStart(timeLineUpdate.indexOf(hour));
            }
        });
    }, []);

    useEffect(() => {
        let startExist = false;
        let endExist = false;
        Object.values(timeLineUpdate).forEach( hour => {
            if (hour.start) {
                startExist = true;
            }
            if (hour.end) {
                endExist = true;
            }
        });
        if (startExist && !endExist) {
            Object.values(timeLineUpdate).forEach( hour => {
                if (hour.start) {
                    delete hour.start;
                }
            });
        }
    }, []);

    useEffect(() => {
        Object.values(timeLineUpdate).forEach( hour => {
            if (hour.start) {
                setStartSelected(true);
                hour.color = colorStringStatus;
            }
            if (hour.end) {
                setStartSelected(false);
            }
        });
    }, [timeLineUpdate]);

    function chooseColor(colorString: "red" | "orange" | "#2196F3" | "#28c916") {
        setColorStringStatus(colorString);
        setColorEditMode(false);
        createEffectTimeLine(timeLineUpdate[initialStart], timeLineUpdate, setTimeLineUpdate, colorStringStatus);
    }

    return(
        <View style={{ flexDirection: "column", paddingBottom: expand === true ? 80 : 10 }}>
            <EffectsFlatList {...EffectsFlatListProps}></EffectsFlatList>
            <IconI onPress={() => console.log("POG")}
                name={"add"} style={[styles.AddIconPadding]}/>
            { colorEditMode && <View style={{ flexDirection: "column" }}>
                <IconI onPress={() => chooseColor("red")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
                <IconI onPress={() => chooseColor("orange")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "orange" }]}></IconI>
                <IconI onPress={() => chooseColor("#2196F3")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#2196F3" }]}></IconI>
                <IconI onPress={() => chooseColor("#28c916")} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    IconTimelinePadding: {
        paddingHorizontal: 1,
        fontSize: 18,
        color: "#EEE",
        alignSelf: "center",
        marginTop: -11
    },
    IconPadding: {
        paddingHorizontal: "50%",
        paddingVertical: 5,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    AddIconPadding: {
        paddingTop: 20,
        fontSize: 18,
        color: "silver",
        textAlign: "center"
    },
});

