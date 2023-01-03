// Source Imports
import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import useClientStore from "../../zustand/clientStore";
import WaterSurveyForm from "./WaterSurveyForm";

export default function SurveyModal(): JSX.Element {
    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }));

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "water-survey-modal" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: 5, flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Icon
                                style={{ padding: 5, margin: 0 }}
                                onPress={() => updateModalVisible("hide-modal")}
                                name="close-outline" size={30} color="white"
                            />
                        </View>
                        <Text style={{ color: "white", textAlign: "right", fontSize: 20, paddingBottom: 5 }}>{"Let's Start Hydrating"}</Text>

                        <FlatList
                            data={[ "1", "2", "3" ]}
                            renderItem= {({ item, index }) => {
                                return (
                                    <WaterSurveyForm key={index} formType={item}/>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        ></FlatList>

                        <View style={{ flexDirection: "row", alignSelf: "flex-end", padding: 15 }}>
                            <Text style={{ color: "white", textAlign: "right", fontSize: 20 }}>Submit</Text>
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
        width: "80%", padding: 10,
        height: "70%",
        backgroundColor: "#163059",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        overflow: "hidden",
        borderRadius: 10,
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
