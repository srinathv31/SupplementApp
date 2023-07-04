// Source Imports
import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Divider from "../Design/Divider";
import useClientStore from "../../zustand/clientStore";

export default function DailySupplementDetails({ setInfoMode }: {
    setInfoMode?: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
    const selectedSupplement = useClientStore(state => state.selectedSupplement);

    const handleMoreInfo = () => {
        if (setInfoMode) {
            setInfoMode(false);
        }
    };

    return(
        <KeyboardAvoidingView behavior="padding">
            <View style={styles.modalContent}>
                <Text style={{ color: "white", fontSize: 28, alignSelf: "center", padding: 10 }}>{selectedSupplement.Supplement.name}</Text>
                <Divider length="small"></Divider>
                <Text onPress={handleMoreInfo} style={{ color: "white", fontSize: 28, alignSelf: "center", padding: 10 }}>{"Link"}</Text>
                <Divider length="small"></Divider>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "#112442",
        height: "100%",
        padding: 10
    },
    input: {
        height: 300,
        width: 350,
        margin: 12,
        padding: 10,
        color: "white"
    },
    IconPadding: {
        paddingHorizontal: 1,
        paddingVertical: 10,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    IconTimelinePadding: {
        paddingHorizontal: 1,
        fontSize: 18,
        color: "#EEE",
        alignSelf: "center",
        marginTop: -11
    },
    buttonText: {
        paddingHorizontal: 5
    }
});
