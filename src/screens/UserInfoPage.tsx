// Source Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Divider from "../components/Design/Divider";
import { AppProps } from "../interfaces/Props";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";


export default function UserInfoPage({ userData, modalVisible, setModalVisible }: AppProps): JSX.Element {
    return(
        <Modal
            animationIn={"fadeIn"}
            animationOut={"slideOutDown"}
            isVisible={modalVisible.modal === "user-modal" ? true : false}
            onBackdropPress={() => setModalVisible({ modal: "hide-modal" })}
            useNativeDriver
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: 10, flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Icon
                                style={{ padding: 5, margin: 0 }}
                                onPress={() => setModalVisible({ modal: "hide-modal" })}
                                name="close-outline" size={30} color="white"
                            />
                        </View>
                        <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10 }}>Hello {userData.name}</Text>
                        <Icon
                            style={{ padding: 5 }}
                            onPress={() => setModalVisible({ modal: "hide-modal" })}
                            name="person-circle-outline" size={80} color="white"
                        />
                        <Text style={{ color: "white", fontSize: 14, textAlign: "center", padding: 5, marginBottom: 5 }}>Change Profile Picture</Text>
                        <Divider length="small"></Divider>
                        <View style={{ backgroundColor: "#112442", padding: 10, margin: 20, borderRadius: 5, width: "100%" }}>
                            <Text style={{ color: "crimson", fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>Reset Entire Plan</Text>
                        </View>
                    </View>
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
    },
    modalView: {
        width: "100%", padding: 10,
        height: "95%",
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
        marginTop: "0%"
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
