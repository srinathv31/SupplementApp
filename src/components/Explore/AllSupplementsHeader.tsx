// Source Imports
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function AllSupplementsHeader({ setAllOpen }: {
    setAllOpen: (o: boolean) => void
}): JSX.Element {
    return(
        <View style={[styles.headerBlock, { flexDirection: "row", justifyContent: "center" }]}>
            <Icon onPress={() => setAllOpen(false)}
                name="arrow-back-outline" style={{ color: "white", alignSelf: "center" }} size={30}></Icon>
            <Text style={styles.headerText}>
                All <Text style={[styles.headerText, { color: "#36D1DC" }]}>{"Supplements"}</Text>
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    headerText: {
        color: "white",
        fontWeight: "600",
        fontSize: 25,
        textAlign: "center",
        padding: 5,
    },
    headerBlock: {
        paddingHorizontal: 5,
        marginHorizontal: 10
    }
});
