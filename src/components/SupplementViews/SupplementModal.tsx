// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { AppProps } from "../../interfaces/Props";
import SearchBar from "./SearchBar";
import SupplementListView from "./SupplementListView";



export default function SupplementModal( AllProps: AppProps ): JSX.Element {
    const [query, setQuery] = useState<string>("");

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={AllProps.modalVisible.modal === "supplement-modal" ? true : false}
            onRequestClose={() => {
                AllProps.setModalVisible({ modal: "hide-modal" });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose Supplement to Add</Text>
                    <SearchBar
                        setQuery={setQuery}
                        query={query}
                    ></SearchBar>
                    <SupplementListView
                        {...AllProps}
                        fontSizeNumber={18}
                        query={query}
                    ></SupplementListView>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => AllProps.setModalVisible({ modal: "hide-modal" })}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
                <Toast />

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    modalView: {
        width: "75%", padding: 10,
        height: "80%",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        overflow: "hidden"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center",
        marginTop: "-55%"
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
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
