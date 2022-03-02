// Source Imports
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppProps } from "../../interfaces/Props";
import Icon from "react-native-vector-icons/Ionicons";
import { shareAchievement } from "../../utilities/shareFunctions";

export default function AchievementsList({ setNumberOfAchievements, numberOfAchievements, completedAchievements }: {
    setNumberOfAchievements: (a: number) => void, numberOfAchievements: number,
    completedAchievements: AppProps["completedAchievements"]
}): JSX.Element {

    useEffect(() => {
        let count = 0;
        Object.values(completedAchievements).forEach(item => {
            if(item.color === "skyblue"){
                count++;
            }
        });
        setNumberOfAchievements(count);
    }, []);

    return(
        <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            {completedAchievements.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "97%", borderWidth: item.color === "skyblue" ? 1 : 0, borderColor: item.color === "skyblue" ? "skyblue" : "transparent" }}>
                        <Text
                            style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>
                            {item.name}
                        </Text>
                        { item.color === "skyblue" && 
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text
                                style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>
                                {item.description}
                            </Text>
                            <Icon onPress={() => shareAchievement(item, numberOfAchievements)}
                                name="share-outline" style={{ color: "white" }} size={25}></Icon>
                        </View>
                        }
                    </View>
                );
            })}
        </ScrollView>
    );
}
