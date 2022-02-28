// Source Imports
import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { AppProps } from "../../interfaces/Props";


export default function UserPageButton( { setShowButtons, setModalVisible, modalVisible, userData }: AppProps ): JSX.Element {
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
                    <Image source={profilePicture.url} style={{ width: 40, height: 40 }}></Image>
                </View>
            </Pressable>
        </>
    );
}
