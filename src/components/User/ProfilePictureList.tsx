// Source Imports
import React, { useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";
import profileImages from "../../assets/profilePics/profilePics";

export default function ProfilePictureList({ setChangePictureMode }: {
    setChangePictureMode: (p: boolean) => void,
}): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pictureList = [
        profileImages.dog,
        profileImages.mountain,
        profileImages.skyline,
    ];

    // async function changeProfilePicture(item: string) {
    //     const userCopy = { ...userData };

    //     if (completedAchievements[5].color === "white") {
    //         achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 5);
    //     }

    //     if (item === addPic) {
    //         setIsLoading(true);
    //         // eslint-disable-next-line no-case-declarations
    //         const result = await launchImageLibrary({ mediaType: "photo" });
    //         if (result.assets !== undefined) {

    //             const newPath = `${RNFS.DocumentDirectoryPath}/${""+result.assets[0].fileName}`;
    //             // Save the image to the local machine
    //             RNFS.copyFile(""+result.assets[0].uri, newPath)
    //                 .then((success) => {
    //                     console.log("IMG COPIED!"+success);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err.message);
    //                 });
    //             userCopy.picture = newPath;

    //             // Save the image to the firebase storage for backup
    //             if(result.assets[0].uri !== undefined) {
    //                 const uploadUri = Platform.OS === "ios" ? ""+result.assets[0].uri.replace("file://", "") : ""+result.assets[0].uri;
    //                 saveProfilePictureToCloud(userData, uploadUri, userCopy.picture);
    //             }
    //         }
    //     } else {
    //         userCopy.picture = item;
    //     }

    //     updateUserData(userCopy);
    //     saveUserToPhone(userCopy);
    //     setChangePictureMode(false);
    // }

    async function changeLocalProfilePicture(index: number) {
        const userCopy = { ...userData };

        if (completedAchievements[5].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 5);
        }

        const profileMap: Record<number, string> = {
            0: "dog",
            1: "mountain",
            2: "skyline"
        };

        userCopy.picture = profileMap[index];

        updateUserData(userCopy);
        saveUserToPhone(userCopy);
        setChangePictureMode(false);
    }

    return(
        <View style={{ flexDirection: "row" }}>
            { isLoading === false ? 
                pictureList.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => changeLocalProfilePicture(index)}>
                            <View style={{ borderRadius: 10, overflow: "hidden", margin: 10 }}>
                                <Image source={item} style={{ width: 65, height: 65 }}></Image>
                            </View>
                        </TouchableOpacity>
                    );
                }) :
                <ActivityIndicator />
            }
        </View>
    );
}
