// Source Imports
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";

export default function ProfilePictureList({ setUserData, userData, setChangePictureMode }: {
    setUserData: AppProps["setUserData"], userData: AppProps["userData"],
    setChangePictureMode: (p: boolean) => void
}): JSX.Element {
    const pictureList = [
        require("../../assets/images/pitbull.jpg"),
        require("../../assets/images/husky.jpg"),
        require("../../assets/images/trippy_astronaut.png")
    ];

    function changeProfilePicture(index: number) {
        const userCopy = { ...userData };

        switch(index){
        case 0:
            userCopy.picture = "../assets/images/pitbull.jpg";
            break;
        case 1:
            userCopy.picture = "../assets/images/husky.jpg";
            break;
        case 2:
            userCopy.picture = "../assets/images/trippy_astronaut.png";
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
                        <View style={{ borderRadius: 30, overflow: "hidden", margin: 10 }}>
                            <Image source={item} style={{ width: 75, height: 75 }}></Image>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
