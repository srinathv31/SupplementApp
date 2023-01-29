// Source Imports
import React, { useContext, useState } from "react";
import { ActivityIndicator, Image, Platform, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";
import { saveProfilePictureToCloud } from "../../utilities/saveLoadFunctions/saveProfilePicture";
import RNFS from "react-native-fs";
import { addPic, corgiPic, huskyPic, penguinPic } from "../../assets/imageURLs/profilePictureURLs";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";

export default function ProfilePictureList({ setChangePictureMode }: {
    setChangePictureMode: (p: boolean) => void,
}): JSX.Element {
    const { setUserData, userData } = useContext(allPropsContext);

    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pictureList = [
        penguinPic,
        huskyPic,
        corgiPic,
        addPic,
    ];

    async function changeProfilePicture(item: string) {
        const userCopy = { ...userData };

        if (completedAchievements[5].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 5);
        }

        if (item === addPic) {
            setIsLoading(true);
            // eslint-disable-next-line no-case-declarations
            const result = await launchImageLibrary({ mediaType: "photo" });
            if (result.assets !== undefined) {

                const newPath = `${RNFS.DocumentDirectoryPath}/${""+result.assets[0].fileName}`;
                // Save the image to the local machine
                RNFS.copyFile(""+result.assets[0].uri, newPath)
                    .then((success) => {
                        console.log("IMG COPIED!"+success);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                userCopy.picture = newPath;

                // Save the image to the firebase storage for backup
                if(result.assets[0].uri !== undefined) {
                    const uploadUri = Platform.OS === "ios" ? ""+result.assets[0].uri.replace("file://", "") : ""+result.assets[0].uri;
                    saveProfilePictureToCloud(userData, uploadUri, userCopy.picture);
                }
            }
        } else {
            userCopy.picture = item;
        }

        setUserData(userCopy);
        saveUserToPhone(userCopy);
        setChangePictureMode(false);
    }

    return(
        <View style={{ flexDirection: "row" }}>
            { isLoading === false ? 
                pictureList.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => changeProfilePicture(item)}>
                            <View style={{ borderRadius: 10, overflow: "hidden", margin: 10 }}>
                                <Image source={{ uri: item }} style={{ width: 65, height: 65 }}></Image>
                            </View>
                        </TouchableOpacity>
                    );
                }) :
                <ActivityIndicator />
            }
        </View>
    );
}
