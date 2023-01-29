// Source Imports
import React, { useContext, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MoodTimelineFlatlist from "./MoodTimelineFlatlist";
import IconI from "react-native-vector-icons/Ionicons";
import { TimeLineObject } from "../../interfaces/TimeLine";
import MoodObject from "../../interfaces/Mood";
import { SupplementMapObject } from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import { generateTimelineObject } from "../../utilities/generateTimelineObject";
import useClientStore from "../../zustand/clientStore";

export default function MoodTimelinePicker(): JSX.Element {
    const { setSupplementMap, supplementMap, completedAchievements, setCompletedAchievements } = useContext(allPropsContext);

    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }));
    const daySelected = useClientStore(state => state.daySelected);


    const [colorEditMode, setColorEditMode] = useState<boolean>(false);
    const [colorString, setColorString] = useState<"red" | "orange" | "#2196F3" | "#28c916">("red");
    const [initialStart, setInitialStart] = useState<number>(0);
    const [startSelected, setStartSelected] = useState<boolean>(false);

    const [timelineState, setTimelineState] = useState<TimeLineObject[]>(generateTimelineObject());

    useEffect(() => {
        const timelineStateCopy = generateTimelineObject();
        setTimelineState(timelineStateCopy);
    }, [modalVisible]);

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

    function handleTimeline() {
        const supplementMapCopy = { ...supplementMap };

        // Add Mood + Range
        supplementMapCopy[daySelected].DailyMood = setTimelineInDailyMoodObj(supplementMapCopy);
        setSupplementMap(supplementMapCopy);
        updateModalVisible("hide-modal");
        if (completedAchievements[10].color === "white") {
            achievementUnlocked(completedAchievements, setCompletedAchievements, updateModalVisible, 10);
        }
    }
    
    function setTimelineInDailyMoodObj(supplementMapCopy: Record<string, SupplementMapObject>) {
        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: [] };
        }

        supplementMapCopy[daySelected].DailyMood[supplementMap[daySelected].DailyMood.length - 1].TimelineData = timelineState;

        return supplementMapCopy[daySelected].DailyMood;
    }

    const lastMood: MoodObject = supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood !== undefined ? 
        supplementMap[daySelected].DailyMood[supplementMap[daySelected].DailyMood.length - 1] :
        { mood: "", range: 0 , TimelineData: generateTimelineObject() };

    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible !== undefined && modalVisible === "mood-timeline" ? true : false}
                onRequestClose={() => {
                    updateModalVisible("hide-modal");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{"Select Time Range of Mood: \n"} {lastMood === undefined ? "" : lastMood.mood}: {lastMood === undefined ? 0 : lastMood.range}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <MoodTimelineFlatlist {...MoodTimelineProps}/>
                        </View>
                        { colorEditMode && <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <IconI onPress={() => chooseColor("red")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "red" }]}></IconI>
                            <IconI onPress={() => chooseColor("orange")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "orange" }]}></IconI>
                            <IconI onPress={() => chooseColor("#2196F3")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "#2196F3" }]}></IconI>
                            <IconI onPress={() => chooseColor("#28c916")} name={"radio-button-on-outline"} style={[styles.ColorIconPadding, { color: "#28c916" }]}></IconI>
                        </View>}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleTimeline()}
                        >
                            <Text style={styles.textStyle}>{"Close"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
     
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        marginTop: "0%" 
    },
    modalView: {
        width: "90%", padding: 10,
        paddingVertical: 30,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 30,
        elevation: 2,
        width: 100,
        alignSelf: "center"
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    },
    IconPadding: {
        paddingHorizontal: "50%",
        paddingVertical: 5,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    ColorIconPadding: {
        paddingTop: 20,
        margin: 1,
        fontSize: 18,
        color: "#EEE",
    },
});
