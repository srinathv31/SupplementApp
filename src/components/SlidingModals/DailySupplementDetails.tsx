// Source Imports
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";
import Divider from "../Design/Divider";
import { SupplementObject } from "../../interfaces/Supplement";

export default function DailySupplemenyDetails({ selectedSupplement, supplementMap, setSupplementMap }: {
    selectedSupplement: AppProps["selectedSupplement"],
    setSupplementMap: AppProps["setSupplementMap"], supplementMap: AppProps["supplementMap"]
}): JSX.Element {
    const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);
    const [supplementNotes, setSupplementNotes] = useState<string>("");
    const [expand, setExpand] = useState<boolean>(false);

    const data = [{ time: "07:00" }, { time: "08:00" }, { time: "09:00" }, { time: "10:00" }, { time: "11:00" }, { time: "12:00" }, { time: "01:00" }, { time: "02:00" }];

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
            return "Not Taken";
        case "taken-off-time":
            return "Taken Not On Time";
        case "missed":
            return "Missed";
        case "taken-on-time":
            return "Taken On Time";
        }
    }

    return(
        <KeyboardAvoidingView behavior="position">
            <>
                <View style={{ backgroundColor: "#112442", minHeight: "100%", padding: 10 }}>
                    <Text style={{ color: "white", fontSize: 28, alignSelf: "center", padding: 10 }}>{selectedSupplement.Supplement.name}</Text>
                    <Divider length="small"></Divider>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="clock" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Time Scheduled</Text>
                    </View>
                    <Divider length="full"></Divider>
                    <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{selectedSupplement.time === "" ? "No Time Scheduled" : selectedSupplement.time}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="check" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Taken</Text>
                    </View>
                    <Divider length="full"></Divider>
                    <View style={{ flexDirection: "row" }}>
                        <IconI onPress={() => setShowStatusButtons(!showStatusButtons)}
                            name={getRadioButtonStatus(selectedSupplement.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(selectedSupplement.taken) }]}></IconI>
                        <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{getRadioText(selectedSupplement.taken)}</Text>
                    </View>
                    { showStatusButtons && <View style={{ flexDirection: "column" }}>
                        <IconI onPress={() => toggleTakenStatus("not-taken", selectedSupplement)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}>
                            <Text style={styles.buttonText}>Not Taken</Text>
                        </IconI>
                        <IconI onPress={() => toggleTakenStatus("taken-off-time", selectedSupplement)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}>
                            <Text style={{ padding: 10 }}>Taken Not On Time</Text>
                        </IconI>
                        <IconI onPress={() => toggleTakenStatus("missed", selectedSupplement)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}>
                            <Text>Missed</Text>
                        </IconI>
                        <IconI onPress={() => toggleTakenStatus("taken-on-time", selectedSupplement)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}>
                            <Text>Taken On Time</Text>
                        </IconI>
                    </View>}
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="brain" style={styles.IconPadding}/>
                        <Text onPress={() => setExpand(!expand)} style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Effects?</Text>
                    </View>
                    <Divider length="full"></Divider>
                    <View style={{ flexDirection: "row", paddingBottom: expand === true ? 80 : 10 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <Text style={{ padding: 10, color: "white" }}>{item.time}</Text>
                            )}
                            scrollEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        ></FlatList>
                    </View>
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
    buttonText: {
        paddingHorizontal: 5
    }
});
