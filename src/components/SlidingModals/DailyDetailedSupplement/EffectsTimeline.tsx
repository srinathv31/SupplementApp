// Source Imports
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TimeLineObject } from "../../../interfaces/TimeLine";
import IconI from "react-native-vector-icons/Ionicons";
import { EffectsTimelineProps } from "../../../interfaces/EffectsTimelineProps";


export default function EffectsTimeline({ expand, selectedSupplement, setSelectedSupplement, setSupplementMap, supplementMap, daySelected }: EffectsTimelineProps): JSX.Element {
    const [timeLineUpdate, setTimeLineUpdate] = useState<TimeLineObject[]>(selectedSupplement.TimelineData !== undefined ? selectedSupplement.TimelineData : []);
    const [initialStart, setInitialStart] = useState<number>(0);

    useEffect(() => {
        Object.values(timeLineUpdate).forEach( hour => {
            if (hour.start) {
                setInitialStart(timeLineUpdate.indexOf(hour));
            }
        });
    }, []);

    function getTimelineButton(item: TimeLineObject) {
        let buttonName = "radio-button-off-outline";
        item.start || item.end ? buttonName = "radio-button-on-outline" : buttonName = "radio-button-off-outline";
        return buttonName;
    }

    function createEffectTimeLine(item: TimeLineObject) {
        const timeLineDataCopy: TimeLineObject[] = [];
        const selectedSupplementCopy = { ...selectedSupplement };

        // Make copy of timelineData
        Object.values(timeLineUpdate).forEach( item => {
            timeLineDataCopy.push(item);
        });

        // Only set item as start
        Object.values(timeLineDataCopy).forEach( hour => {
            if (hour !== item) {
                delete hour.start;
            } else {
                hour.start = true;
            }
        });
        selectedSupplementCopy.TimelineData = timeLineDataCopy;
        setSelectedSupplement(selectedSupplementCopy);
        setTimeLineUpdate(timeLineDataCopy);
    }

    return(
        <View style={{ flexDirection: "row", paddingBottom: expand === true ? 80 : 10 }}>
            <FlatList
                data={timeLineUpdate}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ borderBottomColor: item.passThrough ? "red" : "transparent", borderBottomWidth: 2 }}>
                            <Text style={{ padding: 10, color: "white" }}>{item.time}</Text>
                        </View>
                        <IconI onPress={() => createEffectTimeLine(item)}
                            name={getTimelineButton(item)} style={[styles.IconTimelinePadding, { color: item.color ? item.color : "silver" }]}/>
                    </View>
                )}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialStart}
                onScrollToIndexFailed={() => setInitialStart(0)}
                initialNumToRender={24}
            ></FlatList>
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
});

