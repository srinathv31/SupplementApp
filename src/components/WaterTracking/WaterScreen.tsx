// Source Imports
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, { G, Circle } from "react-native-svg";

export default function WaterScreen(): JSX.Element {
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const leftToSpendAmount = 800;
    const targetAmount = 1000;

    const spentAmount = targetAmount - leftToSpendAmount;
    const percentage = (spentAmount / targetAmount) * 100;
    const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={{ flexDirection: "row", backgroundColor: "purple", padding: 5, paddingHorizontal: 20, borderRadius: 20, margin: 15 }}>
                <View style={styles.graphWrapper}>
                    <Svg height="90" width="90" viewBox="0 0 180 180">
                        <G rotation={-90} originX="90" originY="90">
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="40"
                            />
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#016afb"
                                fill="transparent"
                                strokeWidth="40"
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </G>
                    </Svg>
                    <Text style={styles.text}>{percentage}%</Text>
                </View>
                <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${spentAmount} ml\n`}/{`${targetAmount} ml`}</Text>
            </LinearGradient>
            <Image source={{ uri: "https://i.imgur.com/uBj2FiH.png" }} style={{ height: 200, width: 200 }} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
        color: "white",
    },
});
