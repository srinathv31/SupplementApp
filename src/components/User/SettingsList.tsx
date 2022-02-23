// Source Imports
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";

export default function SettingsList({ setPage }: {
    setPage: AppProps["setPage"]
}): JSX.Element {

    const SettingButtons = [
        { name: "Edit Name", color: "white", function: () => console.log("EDIT NAME")  },
        { name: "Password", color: "white", function: () => console.log("PASSWORD")  },
        { name: "Log Out", color: "crimson", function: () => createLogOutAlert() }
    ];

    const createLogOutAlert = () =>
        Alert.alert(
            "Are You Sure You Want to Log Out?",
            "You can log back in anytime 😁",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Log Out", onPress: () => setPage({ page: "login-screen" }),
                    style: "destructive"
                }
            ]
        );

    return(
        <>
            {SettingButtons.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "100%" }}>
                        <Pressable>
                            <Text onPress={item.function}
                                style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{item.name}</Text>
                        </Pressable>
                    </View>
                );
            })}
        </>
    );
}
