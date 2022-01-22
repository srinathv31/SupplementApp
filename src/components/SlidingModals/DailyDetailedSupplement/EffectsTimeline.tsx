// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { TimeLineObject } from "../../../interfaces/TimeLine";
import IconI from "react-native-vector-icons/Ionicons";
import { EffectsTimelineProps } from "../../../interfaces/EffectsTimelineProps";


export default function EffectsTimeline({ expand, selectedSupplement, setSelectedSupplement, setSupplementMap, supplementMap, daySelected }: EffectsTimelineProps): JSX.Element {
    const [timeLineUpdate, setTimeLineUpdate] = useState<TimeLineObject[]>(selectedSupplement.TimelineData !== undefined ? selectedSupplement.TimelineData : []);
    const [initialStart, setInitialStart] = useState<number>(0);
    const [colorStringStatus, setColorStringStatus] = useState<"red" | "orange" | "#2196F3" | "#28c916">("red");
    const [colorEditMode, setColorEditMode] = useState<boolean>(false);
    const [startSelected, setStartSelected] = useState<boolean>(false);

    const [fadeStatus, setFadeStatus] = useState<boolean>(false);
    const fadeAnimSub = useRef(new Animated.Value(0)).current;

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

    function createEffectTimeLine(item: TimeLineObject) {
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

    function chooseColor(colorString: "red" | "orange" | "#2196F3" | "#28c916") {
        setColorStringStatus(colorString);
        setColorEditMode(false);
        createEffectTimeLine(timeLineUpdate[initialStart]);
    }

    return(
        <View style={{ flexDirection: "column", paddingBottom: expand === true ? 80 : 10 }}>
            <FlatList
                data={timeLineUpdate}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ borderBottomColor: item.passThrough || item.start || item.end ? item.color : "transparent", borderBottomWidth: 2 }}>
                            <Text style={{ padding: 10, color: "white" }}>{item.time}</Text>
                        </View>
                        <Animated.View style={[{ opacity: startSelected === true ? fadeAnimSub : 1 }]}>
                            <IconI onPress={() => (startSelected === true ? createEffectTimeLine(item) : setColorEditMode(true), setInitialStart(timeLineUpdate.indexOf(item)))}
                                name={getTimelineButton(item)} style={[styles.IconTimelinePadding, { color: item.color ? item.color : "silver" }]}/>
                        </Animated.View>
                    </View>
                )}
                scrollEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialStart}
                onScrollToIndexFailed={() => setInitialStart(0)}
                initialNumToRender={24}
            ></FlatList>
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
});

