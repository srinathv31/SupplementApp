// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";


export default function PrevPageButton( { setShowButtons, setModalVisible }: AppProps ): JSX.Element {

    function buttonHandle(){
        setShowButtons(false);
        setModalVisible({ modal: "user-modal" });
    }

    return(
        <Icon
            style={{ padding: 10,
                margin: 12 }}
            onPress={() => buttonHandle()}
            name="person-circle-outline" size={30} color="white"
        />
    );
}
