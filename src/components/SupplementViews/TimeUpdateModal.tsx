// Source Imports
import React, { useState } from "react";
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { SupplementObject } from "../../interfaces/Supplement";
import useClientStore from "../../zustand/clientStore";

// Not being used currently
export default function TimeUpdateModal({ supplementsToUpdateStatus }: {
    supplementsToUpdateStatus: SupplementObject[]
}): JSX.Element {
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }));
    const daySelected = useClientStore(state => state.daySelected);

    const listOfTimes = Array.from({ length: supplementsToUpdateStatus.length } , () => (""));
    const [time, setTime] = useState<string[]>(listOfTimes);

    return(
       
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "time-update-modal" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.ListName, { textAlign: "center" }]}>{daySelected}</Text>
                        <Text style={[styles.ListName, { textAlign: "center" }]}>{"\nAt What Time(s) did you take each supplement?"}</Text>
                        <FlatList
                            data={supplementsToUpdateStatus}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <TouchableOpacity key={index}>
                                        <View style={styles.ListItem}>
                                            <TextInput
                                                style={[styles.input]}
                                                onChangeText={() => setTime}
                                                value={time[index]}
                                                placeholder="Enter Time Taken"
                                                placeholderTextColor={"gray"}
                                                // onFocus={() => setSelectedForm("firstName")}
                                                // onSubmitEditing={() => setSelectedForm("none")}
                                                returnKeyType="done"
                                                keyboardType="number-pad"
                                            />
                                            <Text style={styles.ListName}>
                                                {item.Supplement.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        ></FlatList>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => updateModalVisible("hide-modal")}>
                                <Text
                                    style={{ color: "white", fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>{"Update Time"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    modalView: {
        width: "85%", padding: 20,
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
        backgroundColor: "#112442", 
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: "95%",
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
    },
    ListItem: {
        fontSize: 24,
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "white",
        paddingHorizontal: 20
    },
    ListName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#EEE",
        alignSelf: "center"
    },
    IconPadding: {
        padding: 1,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    input: {
        height: 50,
        minWidth: "35%",
        margin: 12,
        borderColor: "#36D1DC",
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 10,
        color: "white"
    },
    bar: {
        alignSelf: "center",
    },
});

