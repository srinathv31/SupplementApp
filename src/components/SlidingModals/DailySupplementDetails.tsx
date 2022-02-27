// Source Imports
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";
import Divider from "../Design/Divider";
import { SupplementObject } from "../../interfaces/Supplement";
import DateTimePicker from "@react-native-community/datetimepicker";
import convertDateTimeToStringTime from "../../utilities/convertTime";
import MoodTimlineSupplement from "../Mood/MoodTimlineSupplement";

export default function DailySupplemenyDetails({ selectedSupplement, supplementMap, setSupplementMap, daySelected }: {
    selectedSupplement: AppProps["selectedSupplement"], setSelectedSupplement: AppProps["setSelectedSupplement"],
    setSupplementMap: AppProps["setSupplementMap"], supplementMap: AppProps["supplementMap"],
    daySelected: AppProps["daySelected"]
}): JSX.Element {
    const grabOffTime = selectedSupplement.takenOffTime !== undefined ? new Date("May 17, 2019 "+ selectedSupplement.takenOffTime) : new Date();
    const grabSupplementNote = selectedSupplement.note !== undefined ? selectedSupplement.note : "";

    const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);
    const [supplementNotes, setSupplementNotes] = useState<string>(grabSupplementNote);
    const [time, setTime] = useState<Date>(grabOffTime);

    const MoodTimelineProps = {
        setSupplementMap,
        supplementMap,
        daySelected
    };

    function toggleTakenStatus(taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time", item: SupplementObject) {
        const supplementMapCopy = { ... supplementMap };

        item.taken = taken;
        setSupplementMap(supplementMapCopy);
        setShowStatusButtons(false);
    }

    function getRadioButtonStatus(taken: SupplementObject["taken"]) {
        switch(taken) {
        case "not-taken":
            return "radio-button-off-outline";
        case "taken-off-time":
        case "missed":
            return "radio-button-on-outline";
        case "taken-on-time":
            return "checkmark-circle";
        }
    }
    function getRadioButtonColor(taken: SupplementObject["taken"]) {
        switch(taken) {
        case "not-taken":
            return "#EEE";
        case "taken-off-time":
            return "#fcc623";
        case "missed":
            return "red";
        case "taken-on-time":
            return "#28c916";
        }
    }
    function getRadioText(taken: SupplementObject["taken"]) {
        switch(taken) {
        case "not-taken":
            return "Not Taken Yet";
        case "taken-off-time":
            return "Taken Not On Time";
        case "missed":
            return "Missed";
        case "taken-on-time":
            return "Taken On Time";
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (event: any, selectedDate: any) => {
        const supplementMapCopy = { ...supplementMap };
        const currentDate = selectedDate || time;
        const convertedTime = convertDateTimeToStringTime(currentDate);
        
        Object.values(supplementMapCopy[daySelected].SupplementSchedule).forEach(supplement => {
            if (supplement === selectedSupplement) {
                supplement.takenOffTime = convertedTime;
            }
        });
        setSupplementMap(supplementMapCopy);
        setTime(currentDate);
    };

    useEffect(() => {
        selectedSupplement.note = supplementNotes;
        setSupplementMap(supplementMap);
    }, [supplementNotes]);

    return(
        <KeyboardAvoidingView behavior="padding">
            <>
                <View style={{ backgroundColor: "#112442", minHeight: "100%", padding: 10 }}>
                    <Text style={{ color: "white", fontSize: 28, alignSelf: "center", padding: 10 }}>{selectedSupplement.Supplement.name}</Text>
                    <Divider length="small"></Divider>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="pill" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Status</Text>
                    </View>
                    <Divider length="full"></Divider>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="clock" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{selectedSupplement.time === "" ? "No Time Scheduled" : selectedSupplement.time}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="scale-balance" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 18, padding: 10 }}>Dosage: {!selectedSupplement.dosage ? "0" : selectedSupplement.dosage}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <IconI onPress={() => setShowStatusButtons(!showStatusButtons)}
                            name={getRadioButtonStatus(selectedSupplement.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(selectedSupplement.taken) }]}></IconI>
                        <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{getRadioText(selectedSupplement.taken)}</Text>
                        { selectedSupplement.taken === "taken-off-time" && 
                        <><Text style={{ color: "white", fontSize: 18, paddingLeft: 10, paddingVertical: 10 }}>Taken:</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={time}
                                mode={"time"}
                                is24Hour={true}
                                display="default"
                                textColor="white"
                                themeVariant="dark"
                                style={{ paddingHorizontal: 50, paddingVertical: 20, marginTop: 2 }}
                                onChange={onChange} />
                        </>}
                    </View>
                    { showStatusButtons && <View style={{ flexDirection: "row" }}>
                        <View>
                            <IconI onPress={() => toggleTakenStatus("taken-on-time", selectedSupplement)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}>
                                <Text> Taken On Time</Text>
                            </IconI>
                            <IconI onPress={() => toggleTakenStatus("missed", selectedSupplement)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}>
                                <Text> Missed</Text>
                            </IconI>
                        </View>
                        <View>
                            <IconI onPress={() => toggleTakenStatus("not-taken", selectedSupplement)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}>
                                <Text style={styles.buttonText}> Not Taken Yet</Text>
                            </IconI>
                            <IconI onPress={() => toggleTakenStatus("taken-off-time", selectedSupplement)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}>
                                <Text style={{ padding: 10 }}> Taken Not On Time</Text>
                            </IconI>
                        </View>
                    </View>}
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="brain" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Effects?</Text>
                    </View>
                    <Divider length="full"></Divider>
                    {supplementMap[daySelected].DailyMood["1"].mood === "" && 
                        <Text style={{ color: "silver", fontSize: 15, opacity: 0.8, fontWeight: "600", padding: 10, margin: 10, textAlign: "center" }}>
                            {"You can add moods from the menu using the "}
                            <Icon name="emoticon-happy-outline" size={20} color={ "white" }/>
                            {" Icon"}
                        </Text>
                    }
                    {Object.keys(supplementMap[daySelected].DailyMood).map(eachMood => {
                        return (
                            <MoodTimlineSupplement
                                key={""+eachMood}
                                {...MoodTimelineProps}
                                timelineData={supplementMap[daySelected].DailyMood[eachMood]}
                            ></MoodTimlineSupplement>);
                    })}
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="pencil" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Notes</Text>
                    </View>
                    <Divider length="full"></Divider>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSupplementNotes}
                        value={supplementNotes}
                        multiline
                        placeholder="Any notes on how this dosage affected you?"
                        placeholderTextColor={"silver"}
                        keyboardAppearance="dark"
                    />
                </View>
            </>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 300,
        width: 350,
        margin: 12,
        padding: 10,
        color: "white"
    },
    IconPadding: {
        paddingHorizontal: 1,
        paddingVertical: 10,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    IconTimelinePadding: {
        paddingHorizontal: 1,
        fontSize: 18,
        color: "#EEE",
        alignSelf: "center",
        marginTop: -11
    },
    buttonText: {
        paddingHorizontal: 5
    }
});
