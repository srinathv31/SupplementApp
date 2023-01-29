// Source Imports
import React, { useContext, useState } from "react";
import { Modal, Text, Pressable, StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import shallow from "zustand/shallow";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";

export default function DosagePickerModal(): JSX.Element {
    const { selectedSupplement } = useContext(allPropsContext);

    const { modalVisible, updateModalVisible } = useClientStore(state => ({ modalVisible: state.modalVisible, updateModalVisible: state.updateModalVisible }), shallow);

    const [dosage, setDosage] = useState<string>("0");

    function handleDosageInput() {
        if (!dosage.trim()){
            selectedSupplement.dosage = undefined;
            return;
        }
        selectedSupplement.dosage = dosage;
        updateModalVisible("calendar-modal");
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible === "dosage-modal" ? true : false}
            onRequestClose={() => {
                updateModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select dosage for {selectedSupplement.Supplement.name}</Text>
                    <View style={{ flexDirection: "row", alignSelf: "center", padding: 10, margin: 10 }}>
                        <Icon name="scale-balance" style={styles.IconPadding}/>
                        <Text style={{ color: "white", fontSize: 18, padding: 10 }}>Dosage:</Text>
                        <TextInput
                            style={{ backgroundColor: "#31425c", color: "white", fontSize: 18, padding: 10, paddingRight: 5, paddingLeft: 5, borderRadius: 5, overflow: "hidden" }}
                            value={dosage}
                            keyboardType="decimal-pad"
                            onChangeText={setDosage}
                            clearTextOnFocus
                        ></TextInput>
                        <Text style={{ color: "white", fontSize: 18, padding: 10, paddingLeft: 0 }}> {selectedSupplement.Supplement.dosageMetric}</Text>
                    </View>
                    {selectedSupplement.Supplement.name === "Fish Oil" && 
                    <Text style={{ color: "white", fontSize: 18, padding: 10, textAlign: "center" }}>
                        (Total Omega-3 Content)
                    </Text>}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleDosageInput()}
                    >
                        <Text style={styles.textStyle}>Done</Text>
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
    },
    modalView: {
        width: "75%", padding: 10,
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
    },
    IconPadding: {
        paddingHorizontal: 1,
        paddingVertical: 10,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
});
