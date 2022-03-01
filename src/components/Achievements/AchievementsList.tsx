// Source Imports
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AchievementsList(): JSX.Element {
    const AchievementsList = [
        { name: "First Supplement 😄", description: "", color: "white" },
        { name: "Journalist 📓", description: "", color: "white" },
        { name: "Researcher 🧐", description: "", color: "white" },
        { name: "Achievements", description: "", color: "white" },
        { name: "Help", description: "", color: "white" },
        { name: "Log Out", description: "", color: "skyblue" },
        { name: "Achievements", description: "", color: "white" },
        { name: "Help", description: "", color: "skyblue" },
        { name: "Log Out", description: "", color: "skyblue" },
        { name: "Achievements", description: "", color: "white" },
        { name: "Help", description: "", color: "white" },
        { name: "Log Out", description: "", color: "skyblue" },
        { name: "Achievements", description: "", color: "white" },
        { name: "Help", description: "", color: "white" },
        { name: "Log Out", description: "", color: "white" }
    ];

    return(
        <ScrollView style={{ width: "100%" }}>
            {AchievementsList.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                        <Text
                            style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>
                            {item.name}
                        </Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}
