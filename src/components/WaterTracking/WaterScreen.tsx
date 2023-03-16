// Source Imports
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import IconI from "react-native-vector-icons/Ionicons";
import { fiveHundredMl, stageEight, stageFive, stageFour, stageOne, stageSeven, stageSix, stageThree, stageTwo, thousandMl, twoHundredMl } from "../../assets/imageURLs/waterURLs";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import useClientStore from "../../zustand/clientStore";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";

export default function WaterScreen(): JSX.Element {
    const updateUserData = useClientStore(state => state.updateUserData);
    const userData = useClientStore(state => state.userData);
    const updateSupplementMap = useClientStore(state => state.updateSupplementMap);
    const supplementMap = useClientStore(state => state.supplementMap);
    const daySelected = useClientStore(state => state.daySelected);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);

    const waterCompleted = !supplementMap[daySelected] ? 0 : supplementMap[daySelected].DailyWater.completed;
    const waterGoal = !supplementMap[daySelected] ? userData.data.waterGoal : supplementMap[daySelected].DailyWater.goal;


    function addWater(ml: number){
        const supplementMapCopy = { ...supplementMap };
        const userCopy = { ...userData };

        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: {}, DailyWater: { completed: 0, goal: userData.data.waterGoal } };
        }

        // Add Water to SupplementMap
        supplementMapCopy[daySelected].DailyWater.completed = supplementMapCopy[daySelected].DailyWater.completed + ml;
        userCopy.data.supplementMap = { ...supplementMapCopy };

        updateSupplementMap(supplementMapCopy);
        saveUserData(userCopy, updateUserData, supplementMapCopy);
        updateUserData(userCopy);
    }

    function getWaterPercent() {
        return Math.floor((waterCompleted/waterGoal)*100);
    }

    const treeMap: Record<number, string> = {
        0: stageOne,
        12: stageTwo,
        25: stageThree,
        37: stageFour,
        55: stageFive,
        70: stageSix,
        85: stageSeven,
        100: stageEight
    };

    function getTreeImg() {
        const waterPercent = getWaterPercent();
        const treeImgs = Object.keys(treeMap).map(level => {
            if (+level < waterPercent || +level === waterPercent) {
                return +level;
            }
        });
        const filteredTrees = treeImgs.filter(tree => tree);
        const lastElement = filteredTrees[filteredTrees.length-1];
        if (!lastElement) {
            return treeMap[0];
        }
        return treeMap[lastElement];
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => updateModalVisible("water-modal")}>
                    <View style={[styles.card, { flexDirection: "row", backgroundColor: "#163059", padding: 1, paddingHorizontal: 20, borderRadius: 20, margin: 15 }]}>
                        <View style={styles.graphWrapper}>
                            <AnimatedCircularProgress
                                size={70}
                                width={5}
                                fill={(waterCompleted/waterGoal)*100}
                                tintColor={"#36D1DC"}
                                backgroundColor="#3d5875" 
                                arcSweepAngle={250}
                                rotation={235}
                            />
                            <Text style={styles.text}>{getWaterPercent()}%</Text>
                        </View>
                        <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${waterCompleted} ml\n`}/{`${waterGoal} ml`}</Text>
                    </View>
                </TouchableOpacity>
                <Carousel
                    data={[ { name: fiveHundredMl, ml: 500 }, { name: thousandMl, ml: 1000 }, { name: twoHundredMl, ml: 200 } ]}
                    renderItem= {({ item, index }) => {
                        return (
                            <View key={index} style={[styles.card, { flexDirection: "column", backgroundColor: "#163059", padding: 5, paddingHorizontal: 10, borderRadius: 20, marginRight: 25, justifyContent: "center" }]}>
                                <TouchableOpacity onPress={() => (console.log(item.ml), addWater(item.ml))}>
                                    <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${item.ml}ml+`}</Text>
                                    {item.name !== "cafe" ? 
                                        <Image source={{ uri: item.name }} style={{ height: 100, width: 50, alignSelf: "center", resizeMode: "cover" }}></Image> :
                                        <IconI name={item.name} size={55} style={{ height: 100, width: 50, color: "skyblue" }}></IconI>
                                    }
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    sliderWidth={100}
                    itemWidth={100}
                    layout={"stack"}
                    loop
                    layoutCardOffset={9}
                />
            </View>
            <Image source={{ uri: getTreeImg() }} style={{ height: 200, width: 200 }} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
        margin: 30,
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 18,
        color: "#36D1DC",
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 1,
        marginVertical: 10
    },
});
