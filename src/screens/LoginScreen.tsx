// Source Imports
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Divider from "../components/Design/Divider";
import Page from "../interfaces/Page";

export default function LoginScreen({ setPage }: {
    setPage: (p: Page) => void
}): JSX.Element {
    return(
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <View style={{ padding: 10, flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>Welcome</Text>
                    <Divider length="small"></Divider>
                    <Text onPress={() => setPage({ page: "loading-screen" })} style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10 }}>LOGIN</Text>
                </View>

            </SafeAreaView>
        </View>
    );
}