// Source Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { TimeLineObject } from "../../interfaces/TimeLine";
import IconI from "react-native-vector-icons/Ionicons";
import { MoodTimelineFlatlistProps } from "../../interfaces/MoodTimelineProps";
import { generateTimelineObject } from "../../utilities/generateTimelineObject";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";
import { globalPropsContext } from "../../contextHooks/GlobalPropsContext";

export default function MoodTimelineFlatlist({ timelineState, setTimelineState, colorString, setInitialStart, setColorEditMode, startSelected, initialStart, colorEditMode }: MoodTimelineFlatlistProps): JSX.Element {
    const [fadeStatus, setFadeStatus] = useState<boolean>(false);
    const fadeAnimSub = useRef(new Animated.Value(0)).current;

    const { setUserData, userData } = useContext(globalPropsContext);

    const supplementMap = useClientStore(state => state.supplementMap);

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

    function toggleStart(item: TimeLineObject) {
        if (colorEditMode) {
            return;
        }

        const doesStartExist = { index: 0, exist: false };
        const doesEndExist = { index: 0, exist: false };

        // Make Copy of Timeline[] and set start and end, if they exist.
        const timelineStateCopy: TimeLineObject[] = []; 
        Object.values(timelineState).forEach( hour => {
            timelineStateCopy.push(hour);
            if (hour.start === true){
                doesStartExist.exist = true;
                doesStartExist.index = timelineState.indexOf(hour);
            }
            if (hour.end === true){
                doesEndExist.exist = true;
                doesEndExist.index = timelineState.indexOf(hour);
            }
        });
        
        // Set the starting point
        if(!doesStartExist.exist && !doesEndExist.exist){
            Object.values(timelineStateCopy).forEach( hour => {
                if (hour !== item) {
                    delete hour.start;
                } else {
                    hour.start = true;
                    hour.color = colorString;
                    doesStartExist.index = timelineStateCopy.indexOf(hour);
                }
            });
            setTimelineState(timelineStateCopy);
            saveUserData(userData, setUserData, supplementMap);
            return;
        }

        // Set the ending point
        if (doesStartExist.exist && !doesEndExist.exist && !item.start && timelineStateCopy.indexOf(item) > doesStartExist.index) {
            Object.values(timelineStateCopy).forEach( hour => {
                if (hour !== item) {
                    delete hour.end;
                } else {
                    hour.end = true;
                    hour.color = colorString;
                    doesEndExist.index = timelineStateCopy.indexOf(hour);
                }
            });
    
            if (doesStartExist.index < doesEndExist.index) {
                // Set pass throughs
                Object.values(timelineStateCopy).forEach( hour => {
                    if (timelineStateCopy.indexOf(hour) > doesStartExist.index && timelineStateCopy.indexOf(hour) < doesEndExist.index) {
                        hour.passThrough = true;
                        hour.color = colorString;
                    }
                });
            }
            setTimelineState(timelineStateCopy);
            saveUserData(userData, setUserData, supplementMap);
            return;
        }
        
        if (doesEndExist.exist){
            // Clear both start and end
            Object.values(timelineStateCopy).forEach( hour => {
                delete hour.start;
                delete hour.end;
                delete hour.passThrough;
                delete hour.color;
                delete hour.mood;
            });
            // Only set item as start
            Object.values(timelineStateCopy).forEach( hour => {
                if (hour !== item) {
                    delete hour.start;
                } else {
                    hour.start = true;
                }
            });
            setTimelineState(timelineStateCopy);
            saveUserData(userData, setUserData, supplementMap);
            return;
        }
    }

    return(
        <>
            <FlatList
                data={timelineState.length < 1 ? timelineState : generateTimelineObject()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ borderBottomColor: item.passThrough || item.start || item.end ? item.color : "transparent", borderBottomWidth: 2 }}>
                            <Text style={{ padding: 10, color: "white", textAlign: "center" }}>{item.time}</Text>
                        </View>
                        <Animated.View style={[{ opacity: (startSelected === true && timelineState.indexOf(item) > initialStart) ? fadeAnimSub : 1 }]}>
                            <IconI 
                                onPress={() => (startSelected === true ? 
                                    toggleStart(item) : 
                                    (setInitialStart(timelineState.indexOf(item)), setColorEditMode(true), toggleStart(item)))}
                                name={getTimelineButton(item)}
                                style={[styles.IconTimelinePadding, { color: item.color ? item.color : "silver" }]}/>
                        </Animated.View>
                        {/* { timelineProps[timeLineArrayKey].editMoodMode && timeLineArray[timeLineArrayKey].indexOf(item) === timelineProps[timeLineArrayKey].initialStart ? 
                            <DropDownPicker
                                open={timelineProps[timeLineArrayKey].editMoodMode}
                                value={item.event ? item.event : value}
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
                                onSelectItem={(mood) => {
                                    addMood(item, mood);
                                }}
                            ></DropDownPicker> :
                            <Text onPress={() => moodEditMode(item, false)} style={{ color: "white", paddingHorizontal: 5, textAlign: "center" }}>{item.event}</Text>} */}
                    </View>
                )}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialStart}
                onScrollToIndexFailed={() => setInitialStart(0)}
                initialNumToRender={24}
            ></FlatList>
        </>
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

