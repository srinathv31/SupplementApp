// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import JournalTextEntry from "./JournalTextEntry";

// Component Imports

// Design Imports

export default function JournalEntryModal({ setModalVisible, modalVisible }: {
    setModalVisible: (j: string) => void, modalVisible: string
}): JSX.Element {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "1" ? true : false}
            onRequestClose={() => {
            setModalVisible("0");
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Today's Journal</Text>
                <JournalTextEntry/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible("0")}
                >
                  <Text style={styles.textStyle}>Close Journal</Text>
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
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
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
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: 125
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
      marginBottom: 15,
      textAlign: "center",
      width: 125,
      textDecorationLine: "underline"
    }
});
