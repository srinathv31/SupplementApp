// Source Imports
import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Supplement, { SupplementMapObject } from "../../interfaces/Supplement";
import { supplementDot } from "../../utilities/calendarDots";
import removeEmptyDotObjects from "../../utilities/removeEmptyDotObjects";
import sortDailyList from "../../utilities/sortDailyList";
import SupplementList from "../../assets/SupplementList.json";
import { showAddToast } from "../../utilities/toasts";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import User from "../../interfaces/User";
import { Modalize } from "react-native-modalize";
import WebModal from "../SlidingModals/WebModal";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";


export default function SupplementListView({ fontSizeNumber, query }: {
    fontSizeNumber: number,
	query: string,
}): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const multipleAddMode = useClientStore(state => state.multipleAddMode);
    const index = useClientStore(state => state.index);
    const daySelected = useClientStore(state => state.daySelected);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);
    const { selectedSupplement, updateSelectedSupplement } = useClientStore(state => ({ selectedSupplement: state.selectedSupplement, updateSelectedSupplement: state.updateSelectedSupplement }), shallow);
    const objDaySelected = useClientStore(state => state.objDaySelected);

    // used to open sliding modal
    const modalizeRef = useRef<Modalize>(null);
    const onOpen = () => {
        updateModalVisible("disable-header");
        modalizeRef.current?.open();
    };

    function addSupplement(item: Supplement) {
        const supplementMapCopy = { ...supplementMap };
        
        if (supplementMapCopy[daySelected] === undefined){
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: {}, DailyWater: { completed: 0, goal: userData.data.waterGoal } };
        }
        
        supplementMapCopy[daySelected].SupplementSchedule.push({ Supplement: item, time: "", taken: "not-taken" });
        const userCopy = addDate(userData, objDaySelected, supplementMapCopy);

        supplementMapCopy[daySelected].SupplementSchedule = sortDailyList(supplementMapCopy[daySelected].SupplementSchedule);

        if (completedAchievements[0].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 0);
        }

        saveUserData(userCopy, updateUserData, supplementMapCopy);
        updateUserData(userCopy);

        showAddToast(item, daySelected);
        updateSupplementMap(supplementMapCopy);
    }

    function addDate(userData: User, day: DateData, supplementMap: Record<string, SupplementMapObject>) {
        const userCopy: User = { ...userData };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[daySelected].SupplementSchedule).length > 0){
            if (userCopy.data.selectedDates[stringDate] === undefined) {
                userCopy.data.selectedDates[stringDate] = { dots:[{ key: "", color: "" }], selected: false };
            }
            if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 1){
                userCopy.data.selectedDates[stringDate].dots.push(supplementDot);
            }
            userCopy.data.selectedDates[stringDate].dots = removeEmptyDotObjects(userCopy.data.selectedDates, stringDate);
        }
        updateUserData(userCopy);
        return userCopy;
    }

    // function expandSupplement(item: Supplement) {
    //     setSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" });
    //     updateModalVisible("info-modal");
    // }

    function jumpToWeb(item: Supplement) {
        if (completedAchievements[2].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 2);
        }
        updateSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" });
        onOpen();
    }

    return(
        <>
            <View style={{ alignSelf: "center", flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={
                            SupplementList.filter(post => {
                                if (query === "") {
                                    return post;
                                } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
                                    return post;
                                }
                            })
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.name}
                                onPress={ 
                                    multipleAddMode ? () => (updateSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" }), updateModalVisible("time-modal"))
                                        : index === 2 ? () => jumpToWeb(item) : () => addSupplement(item)
                                }
                            >
                                <View>
                                    <Text style={fontSizeNumber === 24 ? styles.ListItem : styles.ListItemSmall}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    ></FlatList>
                </View>
            </View>
            <WebModal
                modalizeRef={modalizeRef}
                url={selectedSupplement.Supplement.url}
                index={index}
            ></WebModal>
        </>
    );
}

const styles = StyleSheet.create({
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
        width: 200
    },
    ListItemSmall: {
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        padding: 10,
        margin: 10,
        color: "white",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#112442",
        overflow:"hidden",
        width: 180
    }
});
