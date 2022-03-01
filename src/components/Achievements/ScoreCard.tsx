// Source Imports
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import * as Progress from "react-native-progress";

export default function ScoreCard({ userData, completedAchievements }: {
    userData: AppProps["userData"],
    completedAchievements: number
}): JSX.Element {
    const [profilePicture, setProfilePicture] = useState({ url: require("../../assets/images/pitbull.jpg") });

    useEffect(() => {
        const profilePictureCopy = { ...profilePicture };
        switch (userData.picture){
        case "../assets/images/pitbull.jpg":
            profilePictureCopy.url = require("../../assets/images/pitbull.jpg");
            break;
        case "../assets/images/husky.jpg":
            profilePictureCopy.url = require("../../assets/images/husky.jpg");
            break;
        case "../assets/images/trippy_astronaut.png":
            profilePictureCopy.url = require("../../assets/images/trippy_astronaut.png");
            break;
        }
        setProfilePicture(profilePictureCopy);
    }, [userData]);

    return(
        
        <View style={{ flexDirection: "row" }}>
            <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                <Image source={profilePicture.url} style={{ width: 80, height: 80 }}></Image>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 23, textAlign: "center", padding: 10, paddingBottom: 0 }}>Completed: {completedAchievements}/15</Text>
                <Progress.Bar 
                    style={{ marginVertical: 20 }}
                    progress={completedAchievements/15}
                    width={180} 
                    color={"#11ed27"}
                    animated
                />
            </View>
        </View>
    );
}
