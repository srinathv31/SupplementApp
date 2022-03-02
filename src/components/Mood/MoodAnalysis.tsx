// Source Imports
import { BottomTabBar } from "./BottomTabBar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import MoodBarGraph from "./MoodBarGraph";

export default function MoodAnalysis(AllProps: AppProps): JSX.Element {
    const [graphType, setGraphType] = useState<string>("data1");
    const [tabSelect, setTabSelect] = useState<"weekly" | "daily" | "monthly">("daily");

    return(
        <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.modalText}>{AllProps.week[0].dateString+""} - {AllProps.week[6].dateString+""}</Text>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <MoodBarGraph graphType={graphType} week={AllProps.week}></MoodBarGraph>
                <BottomTabBar   setTabSelect={setTabSelect} setGraphType={setGraphType} tabSelect={tabSelect}  />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
