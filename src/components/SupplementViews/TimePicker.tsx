// Source Imports
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import DateTimePicker from "@react-native-community/datetimepicker";
import sortDailyList from "../../utilities/sortDailyList";
import convertDateTimeToStringTime from "../../utilities/convertTime";


export default function TimePicker({ setModalVisible, modalVisible, selectedSupplement, setSupplementMap, supplementMap, daySelected, multipleAddMode }: 
	AppProps): JSX.Element {
    const [time, setTime] = useState<Date>(new Date());

    function handleJournal() {
        multipleAddMode ? setModalVisible({ modal: "dosage-modal" }) : setModalVisible({ modal: "hide-modal" });
    }
	
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (event: any, selectedDate: any) => {
        const supplementMapCopy = { ...supplementMap };
        const currentDate = selectedDate || time;
        const convertedTime = convertDateTimeToStringTime(currentDate);
        if (multipleAddMode) {
            selectedSupplement.time = convertedTime;
            return;
        }
        Object.values(supplementMapCopy[daySelected].SupplementSchedule).forEach(supplement => {
            if (supplement === selectedSupplement) {
                supplement.time = convertedTime;
            }
        });
        supplementMapCopy[daySelected].SupplementSchedule = sortDailyList(supplementMapCopy[daySelected].SupplementSchedule);
        setSupplementMap(supplementMap);
        setTime(currentDate);
    };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "time-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    { multipleAddMode ? <Text style={styles.modalText}>Choose Scheduled Time For: {selectedSupplement.Supplement.name} {selectedSupplement.time}</Text> : <Text style={styles.modalText}>Setting Time: {selectedSupplement.Supplement.name} {selectedSupplement.time}</Text> }
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode={"time"}
                        is24Hour={true}
                        display="spinner"
                        textColor="white"
                        onChange={onChange}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleJournal()}
                    >
                        { multipleAddMode ? <Text style={styles.textStyle}>Set Time</Text> : <Text style={styles.textStyle}>{ selectedSupplement.time !== "" ? "Set Time" : "Close" }</Text> }
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
        alignItems:"center"
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
    }
});
