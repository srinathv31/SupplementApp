// Source Imports
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
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
        
                <View style={{ padding: 10, alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 40, textAlign: "center", padding: 10 }}>Welcome</Text>
                    <Divider length="small"></Divider>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={{ padding: 40, borderRadius: 15 }}>
                        <Text onPress={() => setPage({ page: "loading-screen" })} style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10 }}>LOGIN</Text>
                        <AppleSignIn 
                            setUserData={setUserData}
                            userData={userData}    
                        ></AppleSignIn>
                    </LinearGradient>
                </View>

            </SafeAreaView>
        </View>
    );
}
