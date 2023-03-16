import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import shallow from "zustand/shallow";
import { SupplementObject } from "../../interfaces/Supplement";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import useClientStore, { ClientState } from "../../zustand/clientStore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { Modalize } from "react-native-modalize";
import DailySupplementDetails from "../SlidingModals/DailySupplementDetails";
import ScrollButton from "../HomePage/ScrollButton";
import DailySupplementDosageInput from "./DailySupplementDosageInput";
import deleteSupplementMapDate from "../../utilities/handleSupplementMap";

export default function DailySupplementList() {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const index = useClientStore(state => state.index);
    const daySelected = useClientStore(state => state.daySelected);
    const { selectedSupplement, updateSelectedSupplement } = useClientStore(state => ({ selectedSupplement: state.selectedSupplement, updateSelectedSupplement: state.updateSelectedSupplement }), shallow);
    const objDaySelected = useClientStore(state => state.objDaySelected);

    const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);
    const [downButtonVisible, setDownButtonVisible] = useState<boolean>(true);

    const flatListRef = useRef<FlatList<SupplementObject>>(null);
    // however you detect new items
    const scrollToEnd = () => {
        flatListRef?.current?.scrollToEnd();
    };

    // used to open sliding modal
    const modalizeRef = useRef<Modalize>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight - 50;
    const onOpen = (item: SupplementObject) => {
        updateModalVisible("disable-header");
        updateSelectedSupplement(item);
        modalizeRef.current?.open();
    };

    useEffect(() => {
        modalizeRef.current?.close();
    }, [index]);

    const removeSupplement = (item: SupplementObject) => {
        const supplementMapCopy = { ...supplementMap };
        const userCopy = { ...userData };

        supplementMapCopy[daySelected].SupplementSchedule = supplementMapCopy[daySelected].SupplementSchedule.filter(listItem => listItem !== item);
        userCopy.data.selectedDates = removeDate(objDaySelected, supplementMapCopy);

        deleteSupplementMapDate(supplementMapCopy, daySelected);
        
        updateUserData(userCopy);
        saveUserData(userData, updateUserData, supplementMapCopy);
        updateSupplementMap(supplementMapCopy);
    };

    function removeDate(day: DateData, supplementMap: ClientState["supplementMap"]){
        const selectedDatesCopy = { ...userData.data.selectedDates };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 0){
            selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "supplementCheck") as [{key: string, color: string}];
        }
        return selectedDatesCopy;
    }

    function changeTime(item: SupplementObject) {
        updateSelectedSupplement(item);
        updateModalVisible("time-modal");
    }

    function toggleTakenStatus(taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time", item: SupplementObject) {
        const supplementMapCopy = { ... supplementMap };

        if (taken !== "taken-off-time") {
            delete item.takenOffTime;
        }

        item.taken = taken;
        updateSupplementMap(supplementMapCopy);
        setShowStatusButtons(false);
        updateUserData(userData);
        saveUserData(userData, updateUserData, supplementMapCopy);
    }

    function handleStatusToggle(item: SupplementObject) {
        if (selectedSupplement !== item) {
            updateSelectedSupplement(item);
            setShowStatusButtons(true);
            return;
        }
        setShowStatusButtons(!showStatusButtons);
    }

    function getRadioButtonStatus(taken: SupplementObject["taken"]) {
        switch(taken) {
        case "not-taken":
            return "radio-button-off-outline";
        case "taken-off-time":
        case "missed":
            return "radio-button-on-outline";
        case "taken-on-time":
            return "checkmark-circle";
        }
    }
    function getRadioButtonColor(taken: SupplementObject["taken"]) {
        switch(taken) {
        case "not-taken":
            return "#EEE";
        case "taken-off-time":
            return "#fcc623";
        case "missed":
            return "red";
        case "taken-on-time":
            return "#28c916";
        }
    }

    const timeStatementMap: Record<SupplementObject["taken"], string> = {
        "not-taken": "Time scheduled: ",
        missed: "Time scheduled: ",
        "taken-off-time": "Time Taken: ",
        "taken-on-time": "Time Taken: "
    };

    const renderItem = ({ item }: { item: SupplementObject }) => (
        <TouchableOpacity onPress={() => onOpen(item)} style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.nameText}>{item.Supplement.name}</Text>
                    <IconI onPress={() => handleStatusToggle(item)}
                        name={getRadioButtonStatus(item.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(item.taken) }]}></IconI>
                    { (selectedSupplement === item && showStatusButtons) && <View style={{ flexDirection: "row" }}>
                        <IconI onPress={() => toggleTakenStatus("not-taken", item)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}></IconI>
                        <IconI onPress={() => toggleTakenStatus("taken-off-time", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}></IconI>
                        <IconI onPress={() => toggleTakenStatus("missed", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
                        <IconI onPress={() => toggleTakenStatus("taken-on-time", item)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
                    </View> }
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.timeText} onPress={() => changeTime(item)}>{timeStatementMap[item.taken]}{item.takenOffTime ? item.takenOffTime : item.time}</Text>
                    {item.time === "" && <Icon onPress={() => changeTime(item)} name="clock" style={styles.IconPadding}/>}
                </View>
            </View>
            <DailySupplementDosageInput item={item} />
            <Text style={styles.dosageText}>
                {` ${item.Supplement.dosageMetric}`}
            </Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => removeSupplement(item)}>
                <Text style={styles.buttonText}>
                    <Icon
                        name="delete-forever" style={{ color: "white", alignSelf: "center" }} size={20}/>
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const addItem = () => (
        <TouchableOpacity onPress={() => updateModalVisible("supplement-modal")} style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="pill" color="white" size={20}/>
                    <Text style={[styles.nameText, { marginBottom: 0 }]}>Add Supplement</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <React.Fragment>
            <FlatList
                ref={flatListRef}
                ListFooterComponent={addItem}
                data={supplementMap[daySelected]?.SupplementSchedule}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}-${item.Supplement.name}`}
                style={styles.listContainer}
                onEndReached={() => setDownButtonVisible(false)}
                onScrollBeginDrag={() => setDownButtonVisible(true)}
            />
            {supplementMap[daySelected]?.SupplementSchedule.length > 4
                && <ScrollButton scrollToEnd={scrollToEnd} downButtonVisible={downButtonVisible} />
            }
            <Modalize ref={modalizeRef} modalHeight={height*0.70} onClosed={() => updateModalVisible("hide-modal")}>
                <DailySupplementDetails />
            </Modalize>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 5
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        padding: 12,
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
        marginBottom: 4,
        color: "#fff"
    },
    timeText: {
        fontSize: 14,
        color: "#eee",
    },
    buttonContainer: {
        // backgroundColor: "#f44336",
        backgroundColor: "#31425c",
        borderRadius: 8,
        padding: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    IconPadding: {
        paddingHorizontal: 1,
        marginHorizontal: 1,
        fontSize: 18,
        color: "#EEE"
    },
    dosageText: {
        fontSize: 14,
        color: "#eee",
        marginRight: "5%"
    }
    
});
