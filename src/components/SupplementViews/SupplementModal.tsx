// Source Imports
import React, { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import CustomToast from "../Toast/customToast";
import SearchBar from "./SearchBar";
import SupplementListView from "./SupplementListView";


export default function SupplementModal(): JSX.Element {
    const { setModalVisible, modalVisible, setMultipleAddMode } = useContext(allPropsContext);

    const [query, setQuery] = useState<string>("");

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "supplement-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible("hide-modal");
            }}
            style={{ flex: 1 }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose Supplement to Add</Text>
                    <SearchBar
                        setQuery={setQuery}
                        query={query}
                    ></SearchBar>
                    <View style={{ height: "80%" }}>
                        <SupplementListView
                            fontSizeNumber={18}
                            query={query}
                        ></SupplementListView>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => (setModalVisible("hide-modal"), setMultipleAddMode(false))}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
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
