// Source Imports
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function FoodRDAGraph({ foodRDA, totalRDA }: {
    foodRDA: number,
    totalRDA: number
}): JSX.Element {

    const ratingColorMap: Record<number, string> = {
        0: "orange",
        10: "yellow",
        20: "#00e0ff",
        50: "lime",
    };

    const rdaPercentage = Math.round((foodRDA/totalRDA)*100);

    function calculateGraphColor() {
        const ratingColors = Object.keys(ratingColorMap).map(level => {
            if (+level < rdaPercentage || +level === rdaPercentage) {
                return +level;
            }
        });
        const filteredColors = ratingColors.filter(color => color);
        const lastElement = filteredColors[filteredColors.length-1];
        if (!lastElement) {
            return ratingColorMap[0];
        }
        return ratingColorMap[lastElement];
    }

    return(
        <View style={styles.graphWrapper}>
            <AnimatedCircularProgress
                size={50}
                width={5}
                fill={(foodRDA/totalRDA)*100}
                tintColor={calculateGraphColor()}
                backgroundColor="#3d5875" 
                arcSweepAngle={250}
                rotation={235}
            />
            <Text style={styles.text}>{rdaPercentage}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 12,
        color: "white",
    },
});
