// Source Imports
import React, { useContext } from "react";
import { Image, Pressable, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";


export default function UserPageButton(): JSX.Element {
    const { setModalVisible, modalVisible, userData } = useContext(allPropsContext);

    const updateShowButtons = useClientStore(state => state.updateShowButtons);

    function buttonHandle(){
        updateShowButtons(false);
        setModalVisible("user-modal");
    }

    return(
        <>
            <Pressable 
                onPress={() => buttonHandle()}
                disabled={modalVisible === "disable-header"}
            >
                <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                    <Image source={{ uri: userData.picture }} style={{ width: 40, height: 40 }}></Image>
                </View>
            </Pressable>
        </>
    );
}
