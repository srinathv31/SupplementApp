// Source Imports
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import IconI from "react-native-vector-icons/Ionicons";
import { fiveHundredMl, thousandMl, twoHundredMl } from "../../assets/imageURLs/waterURLs";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function WaterScreen(): JSX.Element {
    const [waterLevel, setWaterLevel] = useState<number>(0);

    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;

    const remainingWaterAmount = 3000 - waterLevel;
    const targetAmount = 3000;

    const spentAmount = targetAmount - remainingWaterAmount;
    const percentage = (spentAmount / targetAmount) * 100;
    const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

    function addWater(ml: number){
        setWaterLevel(waterLevel+ml);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                    <View style={[styles.card, { flexDirection: "row", backgroundColor: "#163059", padding: 1, paddingHorizontal: 20, borderRadius: 20, margin: 15 }]}>
                        <View style={styles.graphWrapper}>
                            <Svg height="90" width="90" viewBox="0 0 180 180">
                                <G rotation={-90} originX="90" originY="90">
                                    <Circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="#F1F6F9"
                                        fill="transparent"
                                        strokeWidth="30"
                                    />
                                    <Circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="#016afb"
                                        fill="transparent"
                                        strokeWidth="30"
                                        strokeDasharray={circleCircumference}
                                        strokeDashoffset={waterLevel > 3000 ? 0 : strokeDashoffset}
                                        strokeLinecap="butt"
                                    />
                                </G>
                            </Svg>
                            <Text style={styles.text}>{Math.floor(percentage)}%</Text>
                        </View>
                        <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${spentAmount} ml\n`}/{`${targetAmount} ml`}</Text>
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
            <Image source={{ uri: "https://i.imgur.com/uBj2FiH.png" }} style={{ height: 200, width: 200 }} />
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
