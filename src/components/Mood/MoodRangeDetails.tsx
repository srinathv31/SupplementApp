// Source Imports
import React from "react";
import { Text, View } from "react-native";
import IconI from "react-native-vector-icons/Ionicons";
import MoodObject from "../../interfaces/Mood";

export default function MoodRangeDetails({ mood, index }: {
    mood: MoodObject, index: number
}): JSX.Element {
    const moodColors = ["#28c916", "#2196F3", "orange"];

    const radioButtons = [
        { id: 1, name: "radio-button-off-outline" },
        { id: 2, name: "radio-button-off-outline" },
        { id: 3, name: "radio-button-off-outline" },
        { id: 4, name: "radio-button-off-outline" },
        { id: 5, name: "radio-button-off-outline" }
    ];

    return(
        <View>
            {mood.mood !== "" && <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 10 }}>
                {mood.mood + ": "}
                {radioButtons.map(item => {
                    return(
                        <IconI key={item.id} name={ mood.range < +item.id ? item.name : "radio-button-on-outline"} style={{ color: moodColors[index] }}></IconI>
                    );
                })}
            </Text>}
        </View>
    );
}
