// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ExploreHeader(): JSX.Element {
    return(
        <View style={styles.headerBlock}>
            <Text style={styles.headerText}>{"Explore and Find Your New"}</Text>
            <Text style={[styles.headerText, { color: "#36D1DC" }]}>{"Supplements"}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    headerText: {
        color: "white",
        fontWeight: "600",
        fontSize: 25,
        textAlign: "left",
        padding: 5
    },
    headerBlock: {
        paddingHorizontal: 5,
        marginHorizontal: 10
    }
});
