// Source Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import Divider from "../components/Design/Divider";
import { allPropsContext } from "../contextHooks/AllPropsContext";
import { generateGreeting } from "../utilities/generateTimeGreetings";

export default function WelcomePage(): JSX.Element {
    const { setPage, userData } = useContext(allPropsContext);

    const [fadeStatus, setFadeStatus] = useState<boolean>(false);

    useEffect(() => {
        fadeIn();
        fadeTop();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fadeStatus === true ? (startFadeOut(), setFadeStatus(false)) : (startFadeIn(), setFadeStatus(true));
        }, 1750);
	
        return () => (clearInterval(interval));
    }, [fadeStatus]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimSub = useRef(new Animated.Value(0)).current;
    const fadeAnimTop = useRef(new Animated.ValueXY()).current;
    fadeAnimTop.setOffset({ x: 0, y: -100 });

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 1 second
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };
    const fadeTop = () => {
        // Brings Name from Top
        Animated.timing(fadeAnimTop, {
            toValue: { x: 0, y: 100 },
            duration: 1200,
            useNativeDriver: false
        }).start();
    };

    const startFadeIn = () => {
        // Breathe In
        Animated.timing(fadeAnimSub, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
        setFadeStatus(true);
    };

    const startFadeOut = () => {
        // Breathe Out
        Animated.timing(fadeAnimSub, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: false
        }).start();
        setFadeStatus(!fadeStatus);
    };

    return(
        <View style={{ padding: 10, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={[{ opacity: fadeAnim }, fadeAnimTop.getLayout()]}>
                <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>{generateGreeting()}{userData.name}</Text>
            </Animated.View>
            <Divider length="small"></Divider>
            <Animated.View style={[{ opacity: fadeAnimSub }]}>
                <Text onPress={() => setPage("app-screen")} style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10 }}>Enter</Text>
            </Animated.View>
        </View>
    );
}
