// Source Imports
import React from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";


export default function UserPageButton( { setShowButtons, setModalVisible, modalVisible }: AppProps ): JSX.Element {

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
                <Icon
                    style={{ padding: 10,
                        margin: 12 }}
                    name="person-circle-outline" size={30} color="white"
                />
            </Pressable>
        </>
    );
}
