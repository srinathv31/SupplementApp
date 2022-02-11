// Source Imports
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import Icon from "react-native-vector-icons/Ionicons";
import MoodObject from "../../interfaces/Mood";

export default function ChangeMoodModal({ userData, setUserData, supplementMap, setSupplementMap, daySelected, setModalVisible, modalVisible, setOpen, selectedDates }: {
    supplementMap: AppProps["supplementMap"], setSupplementMap: AppProps["setSupplementMap"],
    daySelected: AppProps["daySelected"], setModalVisible: AppProps["setModalVisible"],
    modalVisible: AppProps["modalVisible"], setOpen: (o: boolean) => void,
    userData: AppProps["userData"], setUserData: AppProps["setUserData"],
    selectedDates: AppProps["selectedDates"]
}): JSX.Element {
    const [moodList, setMoodList] = useState<MoodObject[]>([]);
    
    function changeMood() {
        setModalVisible({ modal: "hide-modal" });
        setOpen(true);
    }

    function clearAllMood() {
        const supplementMapCopy = { ...supplementMap };

        // Clearing all moods
        Object.keys(supplementMapCopy[daySelected].DailyMood).forEach(key => {
            supplementMapCopy[daySelected].DailyMood[key] = { 
                mood: "",
                range: 0,
                TimelineData: []
            };
        });

        setSupplementMap(supplementMapCopy);
        saveUserData(userData, setUserData, supplementMapCopy, selectedDates);

        setModalVisible({ modal: "hide-modal" });
        setOpen(false);
    }

    useEffect(() => {
        if (supplementMap[daySelected] !== undefined && supplementMap[daySelected].DailyMood !== undefined){
            const dailyMoodObject = supplementMap[daySelected].DailyMood;
            const moodListCopy: MoodObject[] = [];
            Object.keys(dailyMoodObject).forEach(key => {
                if (dailyMoodObject[key].mood !== ""){
                    moodListCopy.push(dailyMoodObject[key]);
                }
            });
            setMoodList(moodListCopy);
        }
    }, [supplementMap, modalVisible]);

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
                    <Text style={styles.modalText}>Overwrite Mood/Add Mood?</Text>
                    <FlatList
                        data={moodList}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => changeMood()}
                                >
                                    <Text style={styles.textStyle}>{`${item.mood}: ${item.range}`}</Text>
                                </Pressable>
                            </View>
                        )}
                    ></FlatList>
                    {supplementMap[daySelected] && supplementMap[daySelected].DailyMood["3"].mood === "" && 
                        <Icon onPress={() => changeMood()}
                            name="add-circle-outline" style={{ color: "white", fontSize: 23, alignSelf: "center" }}></Icon>
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => clearAllMood()}
                        >
                            <Text style={styles.textStyle}>{"Clear All of Today's Moods"}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible({ modal: "hide-modal" })}
                        >
                            <Text style={styles.textStyle}>{"Don't Change Any Moods"}</Text>
                        </Pressable>
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
        marginTop: "0%" 
    },
    modalView: {
        width: "95%", padding: 10,
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
