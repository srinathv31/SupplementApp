// Source Imports
import React, { useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppProps } from "../../interfaces/Props";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

import BottomMenuTabStyles from "../../styles/BottomMenuTab";
import ChangeMoodModal from "../Mood/ChangeMoodModal";

export default function BottomMenuTab({ setModalVisible, modalVisible, showButtons, setShowButtons, index, setIndex, setPrevIndex, setMultipleAddMode, setMood, supplementMap, daySelected }: AppProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        { label: "Energetic", value: "Energetic" },
        { label: "Focused", value: "Focused" },
        { label: "Motivated", value: "Motivated" },
        { label: "Peaceful", value: "Peaceful" },
        { label: "Optimistic", value: "Optimistic" },
        { label: "Calm", value: "Calm" },
        { label: "Lively", value: "Lively" },
        { label: "Relaxed", value: "Relaxed" },
        { label: "Fatigued", value: "Fatigued" },
        { label: "Unfocused", value: "Unfocused" },
        { label: "Scatter Brained", value: "Scatter Brained" },
        { label: "Anxious", value: "Anxious" },
        { label: "Cynical", value: "Cynical" },
        { label: "Discontented", value: "Discontented" },
        { label: "Irritability", value: "Irritability" },
        { label: "Difficulty Sleeping", value: "Difficulty Sleeping" },
        { label: "Unmotivated", value: "Unmotivated" },
        { label: "Depressed", value: "Depressed" },
    ]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start();
    };
    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    function buttonHandle(){
        showButtons ? (fadeOut(), setShowButtons(false)) : (fadeIn(), setShowButtons(true));
    }

    function addMood(item: ItemType) {
        setMood(""+item.label);
        setModalVisible({ modal: "mood-modal" });
    }

    function handleMoodOpen() {
        (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "") ? 
            setModalVisible({ modal: "mood-change-modal" }) :
            setOpen(!open);
    }

    return(
        <View style={{ zIndex: 100 }}>
            <ChangeMoodModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                setOpen={setOpen}
                supplementMap={supplementMap}
                daySelected={daySelected}
            ></ChangeMoodModal>
            { open && <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setItems={setItems}
                setValue={() => setValue}
                theme="DARK"
                dropDownDirection="TOP"
                textStyle={{ fontSize: 15, color: "white", textAlign: "center" }}
                labelStyle={{ fontSize: 15, textAlign: "center" }}
                containerStyle={{ width: "80%", alignSelf: "center", opacity: 0.95 }}
                searchable
                placeholder="Select A Mood for the Day"
                searchPlaceholder="Start Typing a Mood"
                onSelectItem={(item) => {
                    addMood(item);
                }}
            ></DropDownPicker> }
            <Animated.View style={{ opacity: fadeAnim }}>
                { showButtons && <View style={BottomMenuTabStyles.secondaryButtonRow}>
                    <Icon onPress={() => setModalVisible({ modal: "supplement-modal" })}
                        name="pill" size={30} color="white"/>
                    <Icon onPress={() => handleMoodOpen()} 
                        name="emoticon-happy-outline" size={30} color={ supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood.mood !== "" ? "lime" : "white" }/>
                    <Icon name="silverware-fork-knife" size={30} color="white"/>
                    <Icon onPress={() => (setModalVisible({ modal: "supplement-modal" }), setMultipleAddMode(true))} 
                        name="clock" size={30} color="white"/>
                </View> }
            </Animated.View>
            <View style={BottomMenuTabStyles.mainButtonRow}>
                <Pressable onPress={() => (setPrevIndex(index), setIndex(0))} disabled={ showButtons ? true : false }>
                    <Icon name={ index === 0 ? "calendar-text" : "calendar-text-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                </Pressable>
                <Pressable onPress={() => (setPrevIndex(index), setIndex(1))} disabled={ showButtons ? true : false }>
                    <Icon
                        name={ index === 1 ? "home" : "home-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                </Pressable>
                <Icon onPress={buttonHandle}
                    name="plus-box-outline" size={30} color="white" style={{ padding: 5 }}/>
                <Pressable onPress={() => (setPrevIndex(index), setIndex(2))} disabled={ showButtons ? true : false }>
                    <Icon
                        name={ index === 2 ? "text-box-search" : "text-box-search-outline"} size={30} color="white" style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                </Pressable>
                <Pressable onPress={() => (setPrevIndex(index), setIndex(3))} disabled={ showButtons ? true : false }>
                    <Icon name={ index === 3 ? "heart-multiple" : "heart-multiple-outline"} size={30} color="white"style={{ opacity: showButtons ? 0.5 : 1, padding: 5, overflow: "hidden" }}/>
                </Pressable>
            </View>
        </View>
    );
}
