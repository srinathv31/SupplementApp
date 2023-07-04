// Source Imports
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingWebModal(): JSX.Element {
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        backgroundColor: "#112442",
    },
});
