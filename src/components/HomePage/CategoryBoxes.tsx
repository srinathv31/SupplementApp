import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IconI from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconM from "react-native-vector-icons/FontAwesome5";
import CategoryBoxesStyles from "../../styles/CategoryBoxStyles";
import { countDailySupplements } from "../../utilities/countDailySupplements";
import useClientStore from "../../zustand/clientStore";
import unitsConversion from "../../utilities/unitsConversion";

export default function CategoryBoxes() {
    const userData = useClientStore(state => state.userData);
    const supplementMap = useClientStore(state => state.supplementMap);
    const daySelected = useClientStore(state => state.daySelected);
    const updateCategorySelect = useClientStore(state => state.updateCategorySelect);
    const selectedUnits = useClientStore(state => state.selectedUnits);

    const categories1 = [
        { name: "Supplements", colors: ["#ee0979", "#ff6a00"], icon: "lightning-bolt", function: () => updateCategorySelect("Supplement Schedule") },
        { name: "Mood", colors: ["#0AB1A2", "#38ef7d"], icon: "yin-yang", function: () => updateCategorySelect("Mood") },
    ];

    const categories2 = [
        { name: "Water", colors: ["#36D1DC", "#5B86E5"], icon: "water", function: () => updateCategorySelect("Water") },
        { name: "Analytics", colors: ["#8E2DE2", "#4A00E0"], icon: "analytics", function: () => console.log("Analysis") }
    ];

    // const coords = { x: Math.floor(Math.random() * 201)-100, y: Math.floor(Math.random() * 201)-100 };
    // const coords1 = { x: Math.floor(Math.random() * 201)-100, y: Math.floor(Math.random() * 201)-100 };
    // const coords2 = { x: Math.floor(Math.random() * 201)-100, y: Math.floor(Math.random() * 201)-100 };
    // const coords3 = { x: Math.floor(Math.random() * 201)-100, y: Math.floor(Math.random() * 201)-100 };

    const coords = { x: -100, y: 50 };
    const coords1 = { x: 100, y: -75 };
    const coords2 = { x: -200, y: 220 };
    const coords3 = { x: 60, y: 90 };

    const fadeAnimTop = useRef(new Animated.ValueXY()).current;
    fadeAnimTop.setOffset(coords);
    const fadeAnimMood = useRef(new Animated.ValueXY()).current;
    fadeAnimMood.setOffset(coords1);
    const fadeAnimWater = useRef(new Animated.ValueXY()).current;
    fadeAnimWater.setOffset(coords2);
    const fadeAnimAnalysis = useRef(new Animated.ValueXY()).current;
    fadeAnimAnalysis.setOffset(coords3);
    const fadeOp = useRef(new Animated.Value(0)).current;

    const scaleAnim = useRef(new Animated.Value(2)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnimTop, {
                toValue: { x: -(coords.x), y: -(coords.y) },
                duration: 370,
                useNativeDriver: false
            }),
            Animated.timing(fadeAnimMood, {
                toValue: { x: -(coords1.x), y: -(coords1.y) },
                duration: 400,
                useNativeDriver: false
            }),
            Animated.timing(fadeAnimWater, {
                toValue: { x: -(coords2.x), y: -(coords2.y) },
                duration: 420,
                useNativeDriver: false
            }),
            Animated.timing(fadeAnimAnalysis, {
                toValue: { x: -(coords3.x), y: -(coords3.y) },
                duration: 440,
                useNativeDriver: false
            }),
            Animated.timing(fadeOp, {
                toValue: 1,
                duration: 450,
                useNativeDriver: false
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            })
        ]).start();
    }, []);

    const dailyWaterCompleted = !supplementMap[daySelected] ? 0 : supplementMap[daySelected].DailyWater.completed;
    const dailyWaterGoal = !supplementMap[daySelected] ? userData.data.waterGoal : supplementMap[daySelected].DailyWater.goal;

    const renderedWaterCompleted = unitsConversion(selectedUnits, dailyWaterCompleted);
    const renderedWaterGoal = unitsConversion(selectedUnits, dailyWaterGoal);

    const moodCount = !supplementMap[daySelected] ? 0 : Object.keys(supplementMap[daySelected].DailyMood).length;

    return(
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {categories1.map((box, idx) => {
                    return(
                        <TouchableOpacity key={idx} style={{ flex: 1 }} onPress={box.function}>
                            <Animated.View style={[{ flex: 1, margin: 10, borderRadius: 10, overflow: "hidden", opacity: fadeOp, transform:[{ scale:scaleAnim }] }, idx === 0 ? fadeAnimTop.getLayout() : fadeAnimMood.getLayout()]}>
                                <LinearGradient colors={box.colors} style={{ flex: 1 }}>
                                    <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
                                        <Text style={CategoryBoxesStyles.label}>{box.name}</Text>
                                        {box.name === "Mood" 
                                            ? <IconM name={box.icon} style={{ color: "white", alignSelf: "center" }} size={70}></IconM>
                                            : <Icon name={box.icon} style={{ color: "white", alignSelf: "center" }} size={70}></Icon>
                                        }
                                        {box.name === "Supplements" && <Text style={CategoryBoxesStyles.label}>{`${countDailySupplements(supplementMap, daySelected)} Scheduled`}</Text>}
                                        {box.name === "Mood" && <Text style={CategoryBoxesStyles.label}>{`${moodCount} Tracked`}</Text>}
                                    </View>
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {categories2.map((box, idx) => {
                    return(
                        <TouchableOpacity key={idx} style={{ flex: 1 }} onPress={box.function}>
                            <Animated.View style={[{ flex: 1, margin: 10, borderRadius: 10, overflow: "hidden", opacity: fadeOp, transform: [{ scale: scaleAnim }] }, idx === 0 ? fadeAnimWater.getLayout() : fadeAnimAnalysis.getLayout()]}>
                                <LinearGradient colors={box.colors} style={{ flex: 1 }}>
                                    <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
                                        <Text style={CategoryBoxesStyles.label}>{box.name}</Text>
                                        <IconI name={box.icon} style={{ color: "white", alignSelf: "center" }} size={70}></IconI>
                                        {box.name !== "Water" && <Text style={CategoryBoxesStyles.label}>{"Coming Soon"}</Text>}
                                        {box.name === "Water" && <Text style={CategoryBoxesStyles.label}>{`${renderedWaterCompleted}/${renderedWaterGoal} ${selectedUnits}`}</Text>}
                                    </View>
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
