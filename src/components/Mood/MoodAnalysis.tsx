// Source Imports
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import Divider from "../Design/Divider";
import MoodPicker from "./MoodPicker";

export default function MoodAnalysis(AllProps: AppProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const MoodProps = {
        open,
        setOpen
    };

    const fadeAnimWeek = useRef(new Animated.Value(0)).current;
    const fadeAnimMon = useRef(new Animated.Value(0)).current;
    const fadeAnimDaily = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.ValueXY()).current;
    fadeAnimWeek.setValue(0.2);
    fadeAnimMon.setValue(0.2);
    fadeAnimDaily.setValue(1);
    slideAnim.setValue({ x: 0, y: 0 });

    const fadeInWeek = () => {
        // Will change fadeAnim value to 1 in 1 second
        Animated.timing(fadeAnimWeek, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeInMon = () => {
        // Breathe In
        Animated.timing(fadeAnimMon, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeInDaily = () => {
        // Breathe In
        Animated.timing(fadeAnimDaily, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeOutWeek = () => {
        // Will change fadeAnim value to 1 in 1 second
        Animated.timing(fadeAnimWeek, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeOutMon = () => {
        // Breathe In
        Animated.timing(fadeAnimMon, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const fadeOutDaily = () => {
        // Breathe In
        Animated.timing(fadeAnimDaily, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: false
        }).start();
    };
    const slideRight = () => {
        Animated.timing(slideAnim, {
            toValue: { x: 120, y: 0 },
            duration: 750,
            useNativeDriver: false
        }).start();
    };
    const slideMiddle = () => {
        Animated.timing(slideAnim, {
            toValue: { x: 0, y: 0 },
            duration: 750,
            useNativeDriver: false
        }).start();
    };const slideLeft = () => {
        Animated.timing(slideAnim, {
            toValue: { x: -115, y: 0 },
            duration: 750,
            useNativeDriver: false
        }).start();
    };

    function handleTab(tab: "weekly" | "daily" | "monthly") {
        // setTab(tab);
        switch (tab) {
        case "daily":
            slideMiddle();
            fadeInDaily();
            fadeOutWeek();
            fadeOutMon();
            break;
        case "monthly":
            slideRight();
            fadeInMon();
            fadeOutWeek();
            fadeOutDaily();
            break;
        case "weekly":
            slideLeft();
            fadeInWeek();
            fadeOutMon();
            fadeOutDaily();
            break;
        } 
    }


    return(
        <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.modalText}>Showing: {AllProps.mood} Data</Text>
            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <MoodPicker 
                    {...MoodProps}
                    {...AllProps}
                    dropDirection="BOTTOM"
                    mode="analysis"
                />
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Animated.View style={{ opacity: fadeAnimWeek }}>
                        <Text onPress={() => handleTab("weekly")} style={[styles.modalText, { padding: 10, marginRight: 30 }]}>Weekly</Text>
                    </Animated.View> 
                    <Animated.View style={{ opacity: fadeAnimDaily }}>
                        <Text onPress={() => handleTab("daily")} style={[styles.modalText, { padding: 10, marginHorizontal: 15 }]}>Daily</Text>
                        <Animated.View style={ [slideAnim.getLayout(), { opacity: 1 }] }>
                            <Divider length="small"></Divider>
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{ opacity: fadeAnimMon }}>
                        <Text onPress={() => handleTab("monthly")} style={[styles.modalText, { padding: 10, marginLeft: 30 }]}>Monthly</Text>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        marginTop: "60%" 
    },
    modalView: {
        width: "75%", padding: 10,
        paddingVertical: 30,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center"
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
