// Source Imports
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { AppProps } from "../../interfaces/Props";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";

export default function ProfilePictureList({ setUserData, userData, setChangePictureMode, setCompletedAchievements, completedAchievements, setModalVisible }: {
    setUserData: AppProps["setUserData"], userData: AppProps["userData"],
    setChangePictureMode: (p: boolean) => void,
    setCompletedAchievements: AppProps["setCompletedAchievements"], completedAchievements: AppProps["completedAchievements"],
    setModalVisible: AppProps["setModalVisible"]
}): JSX.Element {
    const pictureList = [
        require("../../assets/images/penguin.jpg"),
        require("../../assets/images/husky.jpg"),
        require("../../assets/images/corgi.jpg"),
        require("../../assets/images/add.png"),
    ];

    async function changeProfilePicture(index: number) {
        const userCopy = { ...userData };

        if (completedAchievements[5].color === "white") {
            achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 5);
        }

        switch(index){
        case 0:
            userCopy.picture = "../assets/images/penguin.jpg";
            userCopy.uri = undefined;
            break;
        case 1:
            userCopy.picture = "../assets/images/husky.jpg";
            userCopy.uri = undefined;
            break;
        case 2:
            userCopy.picture = "../assets/images/corgi.jpg";
            userCopy.uri = undefined;
            break;
        case 3:
            // eslint-disable-next-line no-case-declarations
            const result = await launchImageLibrary({ mediaType: "photo" });
            if (result.assets !== undefined) {
                userCopy.uri = ""+result.assets[0].uri;
            }
            break;
        }
        setUserData(userCopy);
        saveUserToPhone(userCopy);
        setChangePictureMode(false);
    }

    return(
        <View style={{ flexDirection: "row" }}>
            {pictureList.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => changeProfilePicture(index)}>
                        <View style={{ borderRadius: 10, overflow: "hidden", margin: 10 }}>
                            <Image source={item} style={{ width: 65, height: 65 }}></Image>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
