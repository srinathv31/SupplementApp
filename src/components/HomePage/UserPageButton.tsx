// Source Imports
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { AppProps } from "../../interfaces/Props";


export default function UserPageButton( { setShowButtons, setModalVisible, modalVisible, userData }: AppProps ): JSX.Element {
    const [profilePicture, setProfilePicture] = useState({ url: require("../../assets/images/penguin.jpg") });

    useEffect(() => {
        const profilePictureCopy = { ...profilePicture };
        switch (userData.picture){
        case "../assets/images/penguin.jpg":
            profilePictureCopy.url = require("../../assets/images/penguin.jpg");
            break;
        case "../assets/images/husky.jpg":
            profilePictureCopy.url = require("../../assets/images/husky.jpg");
            break;
        case "../assets/images/corgi.jpg":
            profilePictureCopy.url = require("../../assets/images/corgi.jpg");
            break;
        }
        setProfilePicture(profilePictureCopy);
    }, [userData]);

    function buttonHandle(){
        setShowButtons(false);
        setModalVisible({ modal: "user-modal" });
    }

    return(
        <>
            <Pressable 
                onPress={() => buttonHandle()}
                disabled={modalVisible.modal === "disable-header"}
            >
                <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                    <Image source={userData.uri !== "" ? { uri: userData.uri } : profilePicture.url} style={{ width: 40, height: 40 }}></Image>
                </View>
            </Pressable>
        </>
    );
}
