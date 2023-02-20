import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/Ionicons";
import shallow from "zustand/shallow";
import MoodObject from "../interfaces/Mood";
import saveUserData from "../utilities/saveLoadFunctions/saveUserData";
import useClientStore, { ClientState } from "../zustand/clientStore";

export default function MoodScreen(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const daySelected = useClientStore(state => state.daySelected);
    const updateOpenMoodPicker = useClientStore(state => state.updateOpenMoodPicker);
    const updateMood = useClientStore(state => state.updateMood);
    const objDaySelected = useClientStore(state => state.objDaySelected);

    function addMood() {
        updateOpenMoodPicker(true);
        updateModalVisible("hide-modal");
    }

    function changeMoodRating(item: MoodObject) {
        updateMood(item.mood);
        updateModalVisible("mood-modal");
    }

    function deleteMood(mood: string) {
        const userCopy = { ...userData };
        const supplementMapCopy = { ...supplementMap };
        
        // Delete Mood
        delete supplementMapCopy[daySelected].DailyMood[mood];

        // Deleting Empty Date
        userCopy.data.selectedDates = removeDate(objDaySelected, supplementMapCopy);
        if (supplementMapCopy[daySelected].SupplementSchedule.length === 0 && supplementMapCopy[daySelected].JournalEntry === "" && Object.keys(supplementMapCopy[daySelected].DailyMood).length === 0 ){
            delete supplementMapCopy[daySelected];
        }

        updateUserData(userCopy);
        updateSupplementMap(supplementMapCopy);
        saveUserData(userCopy, updateUserData, supplementMapCopy);
    }

    function removeDate(day: DateData, supplementMap: ClientState["supplementMap"]){
        const selectedDatesCopy = { ...userData.data.selectedDates };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[daySelected].DailyMood).length === 0){
            selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "moodCheck") as [{key: string, color: string}];
        }
        return selectedDatesCopy;
    }

    const addMoodButton = () => (
        <TouchableOpacity onPress={() => addMood()} style={[styles.itemContainer, { justifyContent: "center", paddingVertical: 0 }]}>
            <Icon name="add-circle-outline" style={{ color: "white", fontSize: 25, alignSelf: "center", padding: 10 }} />
            <Text style={[styles.nameText, { marginLeft: 0 }]}>Add Mood</Text>
        </TouchableOpacity>
    );

    const ratingColorMap: Record<number, string> = {
        1: "orange",
        2: "yellow",
        3: "#00e0ff",
        4: "#38ef7d",
        5: "lime"
    };

    return(
        <FlatList
            ListFooterComponent={addMoodButton}
            data={supplementMap[daySelected] !== undefined ? Object.values(supplementMap[daySelected].DailyMood) : []}
            style={styles.listContainer}
            
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.nameText}>{`${item.mood}`}</Text>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => changeMoodRating(item)} style={styles.graphWrapper}>
                            <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={(item.range/5)*100}
                                tintColor={ratingColorMap[item.range]}
                                backgroundColor="#3d5875" 
                                arcSweepAngle={250}
                                rotation={235}
                            />
                            <Text style={styles.text}>{`${item.range}`}</Text>
                        </TouchableOpacity>
                    </View>
                            
                    <TouchableOpacity onPress={() => deleteMood(item.mood)}>
                        <Icon name="trash-outline" style={{ color: "white", fontSize: 23, alignSelf: "center", paddingHorizontal: 10 }}></Icon>
                    </TouchableOpacity>
                </View>
            )}
        ></FlatList>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    moodContainer: { 
        flex: 1,
        flexDirection: "row", 
        justifyContent: "center",
        margin: 1,
        borderRadius: 5,
        overflow: "hidden"
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: "0%" 
    },
    modalView: {
        width: "95%", padding: 10,
        paddingVertical: 30,
        backgroundColor: "#0B172A",
    },
    button: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
        margin: 5,
        elevation: 2,
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
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
        // margin: 10,
    },
    text: {
        position: "absolute",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        color: "white",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        padding: 10,
        backgroundColor: "#112449",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
        // marginBottom: 4,
        marginLeft: 10,
        color: "#fff",
        width: "25%"
    },
});
