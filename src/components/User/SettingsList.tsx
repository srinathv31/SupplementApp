// Source Imports
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function SettingsList(): JSX.Element {

    const SettingButtons = [
        { name: "Edit Name", color: "white" },
        { name: "Password", color: "white" },
        { name: "Log Out", color: "crimson" }
    ];

    return(
        <>
            {SettingButtons.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                        <Pressable>
                            <Text style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                        </Pressable>
                    </View>
                );
            })}
        </>
    );
}
