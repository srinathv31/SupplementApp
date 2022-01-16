// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";

export default function ChangeMoodModal({ userData, setUserData, supplementMap, setSupplementMap, daySelected, setModalVisible, modalVisible, setOpen, selectedDates }: {
    supplementMap: AppProps["supplementMap"], setSupplementMap: AppProps["setSupplementMap"],
    daySelected: AppProps["daySelected"], setModalVisible: AppProps["setModalVisible"],
    modalVisible: AppProps["modalVisible"], setOpen: (o: boolean) => void,
    userData: AppProps["userData"], setUserData: AppProps["setUserData"],
    selectedDates: AppProps["selectedDates"]
}): JSX.Element {
    
    function changeMood() {
        setModalVisible({ modal: "hide-modal" });
        setOpen(true);
    }

    function clearMood() {
        const supplementMapCopy = { ...supplementMap };

        supplementMap[daySelected].DailyMood = { mood: "", range: 0 };
        setSupplementMap(supplementMapCopy);
        saveUserData(userData, setUserData, supplementMapCopy, selectedDates);

        setModalVisible({ modal: "hide-modal" });
        setOpen(false);
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "mood-change-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {supplementMap[daySelected] && <Text style={styles.modalText}>Selected Mood for Day: {supplementMap[daySelected].DailyMood.mood}: {supplementMap[daySelected].DailyMood.range}</Text> }
                    
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => changeMood()}
                    >
                        <Text style={styles.textStyle}>Overwrite Mood?</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => clearMood()}
                    >
                        <Text style={styles.textStyle}>{"Clear Today's Mood"}</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible({ modal: "hide-modal" })}
                    >
                        <Text style={styles.textStyle}>{"Don't Change Mood"}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        marginTop: "0%" 
    },
    modalView: {
        width: "75%", padding: 10,
        paddingVertical: 30,
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
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 5,
        elevation: 2,
        width: 125,
        alignSelf: "center"
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
