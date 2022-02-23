
import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { LogBox } from "react-native";
import MainScreen from "./screens/MainScreen";

LogBox.ignoreLogs(["Sending"]);

const App = () => {

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <MainScreen />

            </SafeAreaView>
        </View>
    );
};

export default App;
