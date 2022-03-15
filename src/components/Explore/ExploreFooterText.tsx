// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ExploreFooterText(): JSX.Element {
    return(
        <View style={[styles.headerBlock, { flexDirection: "row", justifyContent: "space-between" }]}>
            <View>
                <Text style={styles.headerText}>{"Check Out"}</Text>
                <Text style={styles.headerText}>{"These Supplements"}</Text>
            </View>
            <View>
                <Text style={styles.seeAllText}>{"See All"}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    headerText: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
        textAlign: "left",
        padding: 5
    },
    headerBlock: {
        paddingHorizontal: 5,
        marginHorizontal: 10,
        paddingTop: 5,
        marginTop: 5
    },
    seeAllText: {
        color: "white",
        fontWeight: "300",
        fontSize: 18,
        textAlign: "left",
        padding: 5
    }
});
