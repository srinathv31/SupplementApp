// Source Imports
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Divider from "../components/Design/Divider";
import AppleSignIn from "../components/SocialAuth/AppleSignIn";
import GoogleButton from "../components/SocialAuth/GoogleButton";
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
        
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 40, textAlign: "center", padding: 10 }}>Welcome</Text>
                    <Divider length="small"></Divider>
                    <View style={{ width: "95%", margin: 50, padding: 40, borderRadius: 15, alignItems: "center", backgroundColor: "#112442" }}>
                        <Text style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10, fontWeight: "600" }}>Sign Up/Log In</Text>
                        <AppleSignIn 
                            setUserData={setUserData}
                            userData={userData}
                            setPage={setPage}    
                        ></AppleSignIn>
                        <GoogleButton
                            setUserData={setUserData}
                            userData={userData}
                            setPage={setPage}
                        ></GoogleButton>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}
