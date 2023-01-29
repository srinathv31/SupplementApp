// Source Imports
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import useClientStore from "../../zustand/clientStore";
import CustomToast from "../Toast/customToast";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Tooltip from "rn-tooltip";

export default function JournalEntryModal({ children }: {
    children: JSX.Element[]
}): JSX.Element {
    const { updateModalVisible, modalVisible } = useClientStore(state => ({ updateModalVisible: state.updateModalVisible, modalVisible: state.modalVisible }));
    const daySelected = useClientStore(state => state.daySelected);

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "journal" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.modalText}>{daySelected + " Journal Entry"}</Text>
                    </View>
                    {children.map((child) => {
                        return (
                            child
                        );
                    })}
                </View>
            </View>
            <CustomToast />
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },
    modalView: {
        margin: 20,
        marginBottom: "80%",
        backgroundColor: "#121212",
        borderRadius: 20,
        paddingBottom: 15,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        marginBottom: 30
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        width: 175,
        color: "white",
        fontSize: 25
    }
});
