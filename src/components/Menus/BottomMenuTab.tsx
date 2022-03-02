// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppProps } from "../../interfaces/Props";
import BottomMenuTabStyles from "../../styles/BottomMenuTab";
import ChangeMoodModal from "../Mood/ChangeMoodModal";
import MoodPicker from "../Mood/MoodPicker";

export default function BottomMenuTab({ userData, setUserData, setModalVisible, modalVisible, showButtons, setShowButtons, index, setIndex, setMultipleAddMode, setMood,
    setSupplementMap, supplementMap, daySelected, objDaySelected }: AppProps): JSX.Element {
    const [open, setOpen] = useState(false);
    
    const MoodProps = {
        open,
        setOpen
    };

    useEffect(() => {
        showButtons ? fadeIn() : fadeOut();
    }, [showButtons]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    function handleMoodOpen() {
        (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood["1"].mood !== "") ? 
            setModalVisible({ modal: "mood-change-modal" }) :
            setOpen(!open);
    }

    return(
        <KeyboardAvoidingView
            behavior="position"
        >
            <View style={{ zIndex: 100 }}>
                <ChangeMoodModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    setOpen={setOpen}
                    setSupplementMap={setSupplementMap}
                    supplementMap={supplementMap}
                    daySelected={daySelected}
                    userData={userData}
                    setUserData={setUserData}
                    objDaySelected={objDaySelected}
                ></ChangeMoodModal>
                { open && <MoodPicker
                    {...MoodProps}
                    setModalVisible={setModalVisible}
                    setMood={setMood}
                    dropDirection="TOP"
                    mode="setting"
                ></MoodPicker> }
                <View style={{ backgroundColor: "transparent" }}>
                    { showButtons && <Animated.View style={{ opacity: fadeAnim }}>
                        <View style={BottomMenuTabStyles.secondaryButtonRow}>
                            <Icon onPress={() => setModalVisible({ modal: "supplement-modal" })}
                                name="pill" size={30} color="white"/>
                            <Icon onPress={() => handleMoodOpen()} 
                                name="emoticon-happy-outline" size={30} color={ supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood["1"].mood !== "" ? "lime" : "white" }/>
                            <Icon onPress={() => console.log("FORK")}
                                name="silverware-fork-knife" size={30} color="white"/>
                            <Icon onPress={() => (setModalVisible({ modal: "supplement-modal" }), setMultipleAddMode(true))} 
                                name="clock" size={30} color="white"/>
                        </View>
                    </Animated.View>}
                </View>
                <View style={BottomMenuTabStyles.mainButtonRow}>
                    <Pressable onPress={() => (setIndex(0))} disabled={ showButtons ? true : false }>
                        <Icon name={ index === 0 ? "calendar-text" : "calendar-text-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                    </Pressable>
                    <Pressable onPress={() => (setIndex(1))} disabled={ showButtons ? true : false }>
                        <Icon
                            name={ index === 1 ? "home" : "home-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                    </Pressable>
                    <Pressable onPress={() => setShowButtons(!showButtons)} disabled={ index === 3 ? true : false }>
                        <Icon name="plus-box-outline" size={30} color="white" style={{ padding: 5, opacity: index === 3 ? 0.5 : 1 }}/>
                    </Pressable>
                    <Pressable onPress={() => (setIndex(2))} disabled={ showButtons ? true : false }>
                        <Icon
                            name={ index === 2 ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                    </Pressable>
                    <Pressable onPress={() => (setIndex(3))} disabled={ showButtons ? true : false }>
                        <Icon name={ index === 3 ? "heart-multiple" : "heart-multiple-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
