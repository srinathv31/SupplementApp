// Source Imports
import React from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { grabProfilePictureFromCloud } from "../../utilities/saveLoadFunctions/saveProfilePicture";
import useClientStore from "../../zustand/clientStore";


export default function UserPageButton(): JSX.Element {
    const userData = useClientStore(state => state.userData);
    const { updateModalVisible, modalVisible } = useClientStore(state => ({ updateModalVisible: state.updateModalVisible, modalVisible: state.modalVisible }), shallow);

    const { data } = useQuery(["profile-pic"], () => grabProfilePictureFromCloud(userData));

    function buttonHandle(){
        updateModalVisible("user-modal");
    }

    if (!data) {
        return (
            <ActivityIndicator />
        );
    }

    return(
        <Pressable 
            onPress={() => buttonHandle()}
            disabled={modalVisible === "disable-header"}
        >
            <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                <Image source={{ uri: data }} style={{ width: 40, height: 40 }}></Image>
            </View>
        </Pressable>
    );
}
