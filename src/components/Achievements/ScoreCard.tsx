// Source Imports
import React from "react";
import { Image, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import * as Progress from "react-native-progress";

export default function ScoreCard({ userData, numberOfAchievements }: {
    userData: AppProps["userData"],
    numberOfAchievements: number
}): JSX.Element {
    return(
        <View style={{ flexDirection: "row" }}>
            <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                <Image source={{ uri: userData.picture }} style={{ width: 80, height: 80 }}></Image>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10, paddingBottom: 0 }}>Completed: {numberOfAchievements}/15</Text>
                <Progress.Bar 
                    style={{ marginVertical: 20 }}
                    progress={numberOfAchievements/15}
                    width={180} 
                    color={"#11ed27"}
                    animated
                />
            </View>
        </View>
    );
}
