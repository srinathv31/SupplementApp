// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import IconI from "react-native-vector-icons/Ionicons";
import { EffectsFlatListProps } from "../../../../interfaces/EffectsTimelineProps";
import { TimeLineObject } from "../../../../interfaces/TimeLine";
import createEffectTimeLine from "../../../../utilities/timeline.ts/createEffectTimeLine";

export default function EffectsFlatList({ setTimeLineArray, timeLineArray, setTimelineProps, timelineProps, timeLineArrayKey, setTimeLineArrayKey }: EffectsFlatListProps): JSX.Element {
    
    const [fadeStatus, setFadeStatus] = useState<boolean>(false);
    const fadeAnimSub = useRef(new Animated.Value(0)).current;

    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        { label: "No Mood", value: "" },
        { label: "Energetic", value: "Energetic" },
        { label: "Focused", value: "Focused" },
        { label: "Motivated", value: "Motivated" },
        { label: "Peaceful", value: "Peaceful" },
        { label: "Optimistic", value: "Optimistic" },
        { label: "Calm", value: "Calm" },
        { label: "Lively", value: "Lively" },
        { label: "Relaxed", value: "Relaxed" },
        { label: "Fatigued", value: "Fatigued" },
        { label: "Unfocused", value: "Unfocused" },
        { label: "Scatter Brained", value: "Scatter Brained" },
        { label: "Anxious", value: "Anxious" },
        { label: "Cynical", value: "Cynical" },
        { label: "Discontented", value: "Discontented" },
        { label: "Irritability", value: "Irritability" },
        { label: "Difficulty Sleeping", value: "Difficulty Sleeping" },
        { label: "Unmotivated", value: "Unmotivated" },
        { label: "Depressed", value: "Depressed" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            fadeStatus === true ? (startFadeOut(), setFadeStatus(false)) : (startFadeIn(), setFadeStatus(true));
        }, 1000);
	
        return () => (clearInterval(interval));
        
    }, [fadeStatus]);

    const startFadeIn = () => {
        // Breathe In
        Animated.timing(fadeAnimSub, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
        setFadeStatus(true);
    };

    const startFadeOut = () => {
        // Breathe Out
        Animated.timing(fadeAnimSub, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: false
        }).start();
        setFadeStatus(!fadeStatus);
    };

    function getTimelineButton(item: TimeLineObject) {
        let buttonName = "radio-button-off-outline";
        item.start || item.end ? buttonName = "radio-button-on-outline" : buttonName = "radio-button-off-outline";
        return buttonName;
    }

    // function addMood(item: TimeLineObject, mood: ItemType) {
    //     item.event = ""+mood.value;
    //     setTimeLineArray(timeLineArray);
    // }

    function moodEditMode(item: TimeLineObject, onlyStateEdit: boolean) {
        const timelinePropsCopy = { ...timelineProps };

        timelinePropsCopy[timeLineArrayKey].editMoodMode = !timelinePropsCopy[timeLineArrayKey].editMoodMode;
        if (!onlyStateEdit) {
            timelinePropsCopy[timeLineArrayKey].initialStart = timeLineArray[timeLineArrayKey].indexOf(item);
        }
        setTimelineProps(timelinePropsCopy);
    }
    
    function colorEditMode(item: TimeLineObject) {
        const timelinePropsCopy = { ...timelineProps };

        timelinePropsCopy[timeLineArrayKey].colorEditMode = !timelinePropsCopy[timeLineArrayKey].colorEditMode;
        timelinePropsCopy[timeLineArrayKey].initialStart = timeLineArray[timeLineArrayKey].indexOf(item);
        setTimelineProps(timelinePropsCopy);

        setTimeLineArrayKey(timeLineArrayKey);
        createEffectTimeLine(item, timeLineArray, setTimeLineArray, timeLineArrayKey, timelinePropsCopy[timeLineArrayKey].timelineColor);
    }

    return(
        <View>
            <FlatList
                data={timeLineArray[timeLineArrayKey]}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ borderBottomColor: item.passThrough || item.start || item.end ? item.color : "transparent", borderBottomWidth: 2 }}>
                            <Text onPress={() => moodEditMode(item, false)} style={{ padding: 10, color: "white", textAlign: "center" }}>{item.time}</Text>
                        </View>
                        <Animated.View style={[{ opacity: timelineProps[timeLineArrayKey].startSelected === true ? fadeAnimSub : 1 }]}>
                            <IconI 
                                onPress={() => (timelineProps[timeLineArrayKey].startSelected === true ? 
                                    createEffectTimeLine(item, timeLineArray, setTimeLineArray, timeLineArrayKey, timelineProps[timeLineArrayKey].timelineColor) : 
                                    colorEditMode(item)) }
                                name={getTimelineButton(item)}
                                style={[styles.IconTimelinePadding, { color: item.color ? item.color : "silver" }]}/>
                        </Animated.View>
                        { timelineProps[timeLineArrayKey].editMoodMode && timeLineArray[timeLineArrayKey].indexOf(item) === timelineProps[timeLineArrayKey].initialStart ? 
                            <DropDownPicker
                                open={timelineProps[timeLineArrayKey].editMoodMode}
                                // value={item.event ? item.event : value}
                                value={value}
                                items={items}
                                setOpen={() => moodEditMode(item, true)}
                                setItems={setItems}
                                setValue={() => setValue}
                                theme="DARK"
                                dropDownDirection={"TOP"}
                                textStyle={{ fontSize: 15, color: "white", textAlign: "center", opacity: 1 }}
                                labelStyle={{ fontSize: 15, textAlign: "center", opacity: 1 }}
                                dropDownContainerStyle={{ backgroundColor: "#0B172A" }}
                                containerStyle={{ width: 200, height: 200, opacity: 0.95, marginTop: 75 }}
                                // onSelectItem={(mood) => {
                                //     addMood(item, mood);
                                // }}
                            ></DropDownPicker> :
                            <Text onPress={() => moodEditMode(item, false)} style={{ color: "white", paddingHorizontal: 5, textAlign: "center" }}>{item.mood}</Text>}
                    </View>
                )}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={timelineProps[timeLineArrayKey].initialStart}
                onScrollToIndexFailed={() => timelineProps[timeLineArrayKey].initialStart = 0}
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

