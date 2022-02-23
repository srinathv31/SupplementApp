
import React, { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import { LogBox } from "react-native";
import Page from "./interfaces/Page";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";

LogBox.ignoreLogs(["Sending"]);

const App = () => {
    const [page, setPage] = useState<Page>({ page: "login-screen" });

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                { page.page === "login-screen" ? <LoginScreen
                    setPage={setPage}
                ></LoginScreen> :
                    <MainScreen
                        setPage={setPage}
                        page={page}
                    />}

            </SafeAreaView>
        </View>
    );
};

export default App;
