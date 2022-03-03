// Source Imports
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Divider from "../components/Design/Divider";
import AppleSignIn from "../components/SocialAuth/AppleSignIn";
import Page from "../interfaces/Page";
import { AppProps } from "../interfaces/Props";

export default function LoginScreen({ setPage, setUserData, userData }: {
    setPage: (p: Page) => void,
    setUserData: AppProps["setUserData"], userData: AppProps["userData"]
}): JSX.Element {
    return(
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <View style={{ padding: 10, flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>Welcome</Text>
                    <Divider length="small"></Divider>
                    <Text onPress={() => setPage({ page: "loading-screen" })} style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10 }}>LOGIN</Text>
                    <AppleSignIn 
                        setUserData={setUserData}
                        userData={userData}    
                    ></AppleSignIn>
                </View>

            </SafeAreaView>
        </View>
    );
}
