// Source Imports
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import Icon from "react-native-vector-icons/Ionicons";
import MoodObject from "../../interfaces/Mood";
import { SupplementMapObject } from "../../interfaces/Supplement";
import { allPropsContext } from "../../contextHooks/AllPropsContext";

export default function ChangeMoodModal({ setOpen }: {
    setOpen: (o: boolean) => void
}): JSX.Element {
    const { setModalVisible, modalVisible, setUserData, userData, setSupplementMap, supplementMap, daySelected,  } = useContext(allPropsContext);

    const [moodList, setMoodList] = useState<MoodObject[]>([]);
    
    function changeMood() {
        setModalVisible("hide-modal");
        setOpen(true);
    }

    function clearAllMood() {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };

        // Clearing all moods
        Object.keys(supplementMapCopy[daySelected].DailyMood).forEach(key => {
            supplementMapCopy[daySelected].DailyMood[key] = { 
                mood: "",
                range: 0,
                TimelineData: []
            };
        });

        // Deleting Empty Date
        if (supplementMapCopy[daySelected].SupplementSchedule.length === 0 && supplementMapCopy[daySelected].JournalEntry === "" && supplementMapCopy[daySelected].DailyMood["1"].mood === "" ){
            delete supplementMapCopy[daySelected];
            setMoodList([]);
        }

        setUserData(userCopy);
        setSupplementMap(supplementMapCopy);
        saveUserData(userCopy, setUserData, supplementMapCopy);

        setModalVisible("hide-modal");
        setOpen(false);
    }

    function deleteLastIndex(supplementMapCopy: Record<string, SupplementMapObject>) {
        supplementMapCopy[daySelected].DailyMood["3"] = { 
            mood: "",
            range: 0,
            TimelineData: []
        };
        return supplementMapCopy[daySelected].DailyMood;
    }

    function deleteMiddleIndex(supplementMapCopy: Record<string, SupplementMapObject>) {
        if (supplementMapCopy[daySelected].DailyMood["3"].mood !== ""){
            supplementMapCopy[daySelected].DailyMood["2"] = supplementMapCopy[daySelected].DailyMood["3"];
            
            // Delete Third Index
            supplementMapCopy[daySelected].DailyMood["3"] = { 
                mood: "",
                range: 0,
                TimelineData: []
            };
        } else {
            // Delete Second Index
            supplementMapCopy[daySelected].DailyMood["2"] = { 
                mood: "",
                range: 0,
                TimelineData: []
            };
        }

        return supplementMapCopy[daySelected].DailyMood;
    }

    function deleteFirstIndex(supplementMapCopy: Record<string, SupplementMapObject>) {
        if (supplementMapCopy[daySelected].DailyMood["2"].mood !== ""){
            supplementMapCopy[daySelected].DailyMood["1"] = supplementMapCopy[daySelected].DailyMood["2"];
            if (supplementMapCopy[daySelected].DailyMood["3"].mood !== ""){
                supplementMapCopy[daySelected].DailyMood["2"] = supplementMapCopy[daySelected].DailyMood["3"];
                
                // Delete Third Index
                supplementMapCopy[daySelected].DailyMood["3"] = { 
                    mood: "",
                    range: 0,
                    TimelineData: []
                };
                return supplementMapCopy[daySelected].DailyMood;
            }
            // Delete Second Index
            supplementMapCopy[daySelected].DailyMood["2"] = { 
                mood: "",
                range: 0,
                TimelineData: []
            };
            return supplementMapCopy[daySelected].DailyMood;
        }
        // Delete First Index
        supplementMapCopy[daySelected].DailyMood["1"] = { 
            mood: "",
            range: 0,
            TimelineData: []
        };
        return supplementMapCopy[daySelected].DailyMood;
    }

    function deleteMood(item: MoodObject) {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };
        
        if (supplementMapCopy[daySelected].DailyMood["3"] === item){
            supplementMapCopy[daySelected].DailyMood = deleteLastIndex(supplementMapCopy);
        }

        if (supplementMapCopy[daySelected].DailyMood["2"] === item){
            supplementMapCopy[daySelected].DailyMood = deleteMiddleIndex(supplementMapCopy);
        }

        if (supplementMapCopy[daySelected].DailyMood["1"] === item){
            supplementMapCopy[daySelected].DailyMood = deleteFirstIndex(supplementMapCopy);
        }

        // Deleting Empty Date
        if (supplementMapCopy[daySelected].SupplementSchedule.length === 0 && supplementMapCopy[daySelected].JournalEntry === "" && supplementMapCopy[daySelected].DailyMood["1"].mood === "" ){
            delete supplementMapCopy[daySelected];
            setMoodList([]);
        }

        // Close modal if there are no more moods
        if (supplementMapCopy[daySelected] === undefined){
            setModalVisible("hide-modal");
        }

        setUserData(userCopy);
        setSupplementMap(supplementMapCopy);
        saveUserData(userCopy, setUserData, supplementMapCopy);
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
            visible={modalVisible === "mood-change-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible("hide-modal");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add or Delete Mood?</Text>
                    <FlatList
                        data={moodList}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    disabled
                                >
                                    <Text style={styles.textStyle}>{`${item.mood}: ${item.range}`}</Text>
                                </Pressable>
                                <Icon onPress={() => deleteMood(item)}
                                    name="trash-outline" style={{ color: "white", fontSize: 23, alignSelf: "center", paddingHorizontal: 10 }}></Icon>
                            </View>
                        )}
                    ></FlatList>
                    {supplementMap[daySelected] && supplementMap[daySelected].DailyMood["3"].mood === "" && 
                        <Icon onPress={() => changeMood()}
                            name="add-circle-outline" style={{ color: "white", fontSize: 25, alignSelf: "center", padding: 10 }}></Icon>
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "red" }]}
                            onPress={() => clearAllMood()}
                        >
                            <Text style={[styles.textStyle]}>{"Clear All of Today's Moods"}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, { backgroundColor: "green" }]}
                            onPress={() => setModalVisible("hide-modal")}
                        >
                            <Text style={styles.textStyle}>
                                {supplementMap[daySelected].DailyMood["1"].mood !== "" ? "Don't Change Any Moods" : "Close This Window"}
                            </Text>
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
