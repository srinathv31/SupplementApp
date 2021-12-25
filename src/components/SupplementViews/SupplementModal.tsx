// Source Imports
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Supplement from "../../interfaces/Supplement";
import SupplementListView from "./SupplementListView";

// Component Imports

// Design Imports

export default function SupplementModal({ setSuppModalVisible, suppModalVisible, setSupplementMap, supplementMap, daySelected }: {
    setSuppModalVisible: (s: boolean) => void, suppModalVisible: boolean,
    setSupplementMap: (d: Record<string, Supplement[]>) => void, supplementMap: Record<string, Supplement[]>,
    daySelected: string
}): JSX.Element {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={suppModalVisible}
            onRequestClose={() => {
            setSuppModalVisible(!suppModalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Supplement List</Text>
                <SupplementListView
                  setSupplementMap={setSupplementMap}
                  supplementMap={supplementMap}
                  fontSizeNumber={18}
                  query={""}
                  daySelected={daySelected}
                ></SupplementListView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setSuppModalVisible(!suppModalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "25%",
      maxHeight: "55%"
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
