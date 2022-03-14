// Source Imports
import React from "react";
import { Image, Pressable, View } from "react-native";
import { AppProps } from "../../interfaces/Props";


export default function UserPageButton( { setShowButtons, setModalVisible, modalVisible, userData }: AppProps ): JSX.Element {

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
                    <Image source={{ uri: userData.picture }} style={{ width: 40, height: 40 }}></Image>
                </View>
            </Pressable>
        </>
    );
}
