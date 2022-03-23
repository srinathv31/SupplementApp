// Source Imports
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

export default function WaterScreen(): JSX.Element {
    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const leftToSpendAmount = 600;
    const targetAmount = 1000;

    const spentAmount = targetAmount - leftToSpendAmount;
    const percentage = (spentAmount / targetAmount) * 100;
    const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

    return (
        <View style={styles.container}>
            <View style={[styles.card, { flexDirection: "row", backgroundColor: "#163059", padding: 5, paddingHorizontal: 20, borderRadius: 20, margin: 15 }]}>
                <View style={styles.graphWrapper}>
                    <Svg height="90" width="90" viewBox="0 0 180 180">
                        <G rotation={-90} originX="90" originY="90">
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#F1F6F9"
                                fill="transparent"
                                strokeWidth="30"
                            />
                            <Circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#016afb"
                                fill="transparent"
                                strokeWidth="30"
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="butt"
                            />
                        </G>
                    </Svg>
                    <Text style={styles.text}>{percentage}%</Text>
                </View>
                <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${spentAmount} ml\n`}/{`${targetAmount} ml`}</Text>
            </View>
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
        fontWeight: "500",
        fontSize: 18,
        color: "#36D1DC",
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 1,
        marginVertical: 15
    },
});
