// Source Imports
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import IconI from "react-native-vector-icons/Ionicons";
import { fiveHundredMl, thousandMl, twoHundredMl } from "../../assets/imageURLs/waterURLs";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function WaterScreen(): JSX.Element {
    const [waterLevel, setWaterLevel] = useState<number>(0);

    function addWater(ml: number){
        setWaterLevel(waterLevel+ml);
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity>
                    <View style={[styles.card, { flexDirection: "row", backgroundColor: "#163059", padding: 1, paddingHorizontal: 20, borderRadius: 20, margin: 15 }]}>
                        <View style={styles.graphWrapper}>
                            <AnimatedCircularProgress
                                size={70}
                                width={5}
                                fill={(waterLevel/1000)*100}
                                tintColor={"red"}
                                backgroundColor="#3d5875" 
                                arcSweepAngle={250}
                                rotation={235}
                            />
                            <Text style={styles.text}>{1}</Text>
                        </View>
                        <Text style={[styles.text, { position: "relative", alignSelf: "center" }]}>{`${50} ml\n`}/{`${100} ml`}</Text>
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
