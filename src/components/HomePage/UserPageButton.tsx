// Source Imports
import React, { useContext } from "react";
import { Image, Pressable, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";


export default function UserPageButton(): JSX.Element {
    const { setShowButtons, setModalVisible, modalVisible, userData } = useContext(allPropsContext);

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
