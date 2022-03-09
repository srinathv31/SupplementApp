import React from "react";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconI from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CategoryBoxes({ setCategorySelect }: {
    setCategorySelect: (c: "Supplement Schedule"|"Food"|"Water"|"Exercise"|"Home") => void
}) {

    const categories1 = [
        { name: "Supplements", colors: ["#ee0979", "#ff6a00"], icon: "lightning-bolt", function: () => setCategorySelect("Supplement Schedule") },
        { name: "Food", colors: ["#c31432", "#240b36"], icon: "food-variant", function: () => console.log("Food") },
    ];

    const categories2 = [
        { name: "Water", colors: ["#36D1DC", "#5B86E5"], icon: "water", function: () => console.log("Water") },
        { name: "Exercise", colors: ["#8E2DE2", "#4A00E0"], icon: "bicycle", function: () => console.log("Exercise") }
    ];

    return(
        <View style={{ width: "90%" }}>
            <View style={{ flexDirection: "row", height: "40%" }}>
                {categories1.map((item, index) => {
                    return (
                        <LinearGradient onTouchEnd={item.function} key={index} colors={item.colors} style={{ padding: 10, margin: 10, width: "50%", borderRadius: 10, backgroundColor: "#163059", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                            <Icon name={item.icon} style={{ color: "white", alignSelf: "center" }} size={70}></Icon>
                            {item.name === "Food" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{"Coming Soon"}</Text>}
                        </LinearGradient>
                    );
                })}
            </View>
            <View style={{ flexDirection: "row", height: "40%" }}>
                {categories2.map((item, index) => {
                    return (
                        <LinearGradient onTouchEnd={item.function} key={index} colors={item.colors} style={{ padding: 10, margin: 10, width: "50%", borderRadius: 10, backgroundColor: "#163059", justifyContent: "center" }}>
                            <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                            <IconI name={item.icon} style={{ color: "white", alignSelf: "center" }} size={70}></IconI>
                            <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{"Coming Soon"}</Text>
                        </LinearGradient>
                    );
                })}
            </View>
        </View>
    );
}
