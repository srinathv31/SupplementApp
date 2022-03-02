import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function BottomTabBar({ setTabSelect, setGraphType, tabSelect }: {
    setTabSelect: (t: "weekly" | "daily" | "monthly") => void, tabSelect: "weekly" | "daily" | "monthly",
    setGraphType: (g: string) => void
}): JSX.Element {
    return( 
        <View style={{
            flexDirection: "row",
            alignSelf: "center"
        }}>
            <Text onPress={() => (setTabSelect("weekly"), setGraphType("data0"))} style={[styles.modalText, {
                padding: 10,
                marginRight: 30,
                opacity: tabSelect === "weekly" ? 1 : 0.5
            }]}>Weekly</Text>
            <Text onPress={() => (setTabSelect("daily"), setGraphType("data1"))} style={[styles.modalText, {
                padding: 10,
                marginHorizontal: 15,
                opacity: tabSelect === "daily" ? 1 : 0.5
            }]}>Daily</Text>
            <Text onPress={() => (setTabSelect("monthly"), setGraphType("data2"))} style={[styles.modalText, {
                padding: 10,
                marginLeft: 30,
                opacity: tabSelect === "monthly" ? 1 : 0.5
            }]}>Monthly</Text>
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
