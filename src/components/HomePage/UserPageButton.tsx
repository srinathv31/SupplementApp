// Source Imports
import React from "react";
import { Image, Pressable, View } from "react-native";
import shallow from "zustand/shallow";
import profileImages from "../../assets/profilePics/profilePics";
import useClientStore from "../../zustand/clientStore";


export default function UserPageButton(): JSX.Element {
    const userData = useClientStore(state => state.userData);
    const { updateModalVisible, modalVisible } = useClientStore(state => ({ updateModalVisible: state.updateModalVisible, modalVisible: state.modalVisible }), shallow);

    // const { data } = useQuery(["profile-pic"], () => grabProfilePictureFromCloud(userData));

    function buttonHandle(){
        updateModalVisible("user-modal");
    }

    return(
        <Pressable 
            onPress={() => buttonHandle()}
            disabled={modalVisible === "disable-header"}
        >
            <View style={{ borderRadius: 30, overflow: "hidden", margin: 20 }}>
                <Image source={profileImages[userData.picture]} style={{ width: 40, height: 40 }} />
            </View>
        </Pressable>
    );
}
