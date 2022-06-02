// Source Imports
import { BlurView } from "@react-native-community/blur";
import React from "react";
import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { logoWithNameTransparent } from "../assets/imageURLs/brandImageURLs";
import Divider from "../components/Design/Divider";
import AppleSignIn from "../components/SocialAuth/AppleSignIn";
import GoogleButton from "../components/SocialAuth/GoogleButton";
import { PageType } from "../interfaces/AppTypes";
import { AppProps } from "../interfaces/Props";

export default function LoginScreen({ setPage, setUserData, userData }: {
    setPage: (p: PageType) => void,
    setUserData: AppProps["setUserData"], userData: AppProps["userData"]
}): JSX.Element {

    return(
        <ImageBackground style={{ flex: 1 }} source={require("../assets/images/login-background.jpg")} resizeMode="cover">
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle={"light-content"} />
        
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 40, textAlign: "center", padding: 10 }}>Welcome</Text>
                        <View style={styles.card}>
                            <BlurView
                                style={styles.absolute}
                                blurType="light"
                                blurAmount={10}
                                reducedTransparencyFallbackColor="white"
                            />
                            <Image source={{ uri: logoWithNameTransparent }} style={{ height: 100, width: 275 }} />
                            <Text style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10, fontWeight: "600" }}>Sign Up/Log In</Text>
                            <Divider length="small"></Divider>
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
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 15
    },
    card: {
        width: "95%",
        margin: 50,
        padding: 40,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        marginVertical: 5
    }
});
