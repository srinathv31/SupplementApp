// Source Imports
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Page from "../interfaces/Page";

export default function LoginScreen({ setPage }: {
    setPage: (p: Page) => void
}): JSX.Element {
    return(
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <Text onPress={() => setPage({ page: "loading-screen" })}
                    style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>LOGIN</Text>

            </SafeAreaView>
        </View>
    );
}