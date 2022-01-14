// Source Imports
import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Divider from "../components/Design/Divider";
import { AppProps } from "../interfaces/Props";

export default function WelcomePage({ userData, setPrevIndex }: AppProps): JSX.Element {
    useEffect(() => {
        fadeIn();
        fadeOut();
        fadeTop();
    }, []);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimBottom = useRef(new Animated.ValueXY()).current;
    const fadeAnimTop = useRef(new Animated.ValueXY()).current;
    fadeAnimTop.setOffset({ x: 0, y: -100 });
    fadeAnimBottom.setOffset({ x: 0, y: 100 });

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnimBottom, {
            toValue: { x: 0, y: -100 },
            duration: 1200,
            useNativeDriver: false
        }).start();
    };
    const fadeTop = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnimTop, {
            toValue: { x: 0, y: 100 },
            duration: 1200,
            useNativeDriver: false
        }).start();
    };

    return(
        <View style={{ padding: 10, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={[{ opacity: fadeAnim }, fadeAnimTop.getLayout()]}>
                <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>Welcome {userData.name}</Text>
            </Animated.View>
            <Divider length="small"></Divider>
            <Animated.View style={[{ opacity: fadeAnim }, fadeAnimBottom.getLayout()]}>
                <Text onPress={() => setPrevIndex(1)} style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10 }}>Enter</Text>
            </Animated.View>
        </View>
    );
}
