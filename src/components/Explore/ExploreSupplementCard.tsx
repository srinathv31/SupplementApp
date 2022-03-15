// Source Imports
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Supplement from "../../interfaces/Supplement";

export default function ExploreSupplementCard({ supplementData }: {
    supplementData: Supplement
}): JSX.Element {
    return(
        <View>
            <TouchableOpacity>
                <View>
                    <Text style={styles.ListItem}>{supplementData.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    ListItem: {
        fontSize: 24,
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "white",
        width: 160,
    },
});
