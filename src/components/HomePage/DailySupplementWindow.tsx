// Source Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SupplementObject } from "../../interfaces/Supplement";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../interfaces/Props";
import saveUserData from "../../utilities/saveLoadFunctions/saveUserData";
import { Modalize } from "react-native-modalize";
import DailySupplementDetails from "../SlidingModals/DailySupplementDetails";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";

export default function DailySupplementWindow(): JSX.Element {
    const { setSelectedSupplement, setSupplementMap, supplementMap, setUserData, userData, objDaySelected, selectedSupplement } = useContext(allPropsContext);

    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { showButtons, updateShowButtons } = useClientStore(state => ({ showButtons: state.showButtons, updateShowButtons: state.updateShowButtons }));
    const index = useClientStore(state => state.index);
    const daySelected = useClientStore(state => state.daySelected);

    const [showStatusButtons, setShowStatusButtons] = useState<boolean>(false);

    // used to open sliding modal
    const modalizeRef = useRef<Modalize>(null);
    const { height: initialHeight } = Dimensions.get("window");
    const height = initialHeight;
    const onOpen = (item: SupplementObject) => {
        updateShowButtons(false);
        updateModalVisible("disable-header");
        setSelectedSupplement(item);
        modalizeRef.current?.open();
    };

    useEffect(() => {
        modalizeRef.current?.close();
    }, [index]);

    useEffect(() => {
        if (showButtons){
            modalizeRef.current?.close();
        }
    }, [showButtons]);

    function removeSupplement(item: SupplementObject) {
        const supplementMapCopy = { ...supplementMap };
        const userCopy = { ...userData };

        supplementMapCopy[daySelected].SupplementSchedule = supplementMapCopy[daySelected].SupplementSchedule.filter(listItem => listItem !== item);
        userCopy.data.selectedDates = removeDate(objDaySelected, supplementMapCopy);
        if (Object.values(supplementMapCopy[daySelected].SupplementSchedule).length === 0 && supplementMapCopy[daySelected].JournalEntry === "") {
            delete supplementMapCopy[daySelected];
        }
        setUserData(userCopy);
        saveUserData(userData, setUserData, supplementMapCopy);
        setSupplementMap(supplementMapCopy);
    }

    function removeDate(day: DateData, supplementMap: AppProps["supplementMap"]){
        const selectedDatesCopy = { ...userData.data.selectedDates };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[daySelected].SupplementSchedule).length === 0){
            selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "supplementCheck") as [{key: string, color: string}];
        }
        return selectedDatesCopy;
    }

    function changeTime(item: SupplementObject) {
        setSelectedSupplement(item);
        updateModalVisible("time-modal");
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

    function toggleTakenStatus(taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time", item: SupplementObject) {
        const supplementMapCopy = { ... supplementMap };

        item.taken = taken;
        setSupplementMap(supplementMapCopy);
        setShowStatusButtons(false);
        setUserData(userData);
        saveUserData(userData, setUserData, supplementMapCopy);
    }

    function handleStatusToggle(item: SupplementObject) {
        if (selectedSupplement !== item) {
            setSelectedSupplement(item);
            setShowStatusButtons(true);
            return;
        }
        setShowStatusButtons(!showStatusButtons);
    }

    return(
        <>
            <View style={{ alignSelf: "center", flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={supplementMap[daySelected] === undefined ? [] : supplementMap[daySelected].SupplementSchedule}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                { (selectedSupplement === item && showStatusButtons) && <View style={{ flexDirection: "column" }}>
                                    <IconI onPress={() => toggleTakenStatus("not-taken", item)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}></IconI>
                                    <IconI onPress={() => toggleTakenStatus("taken-off-time", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}></IconI>
                                    <IconI onPress={() => toggleTakenStatus("missed", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
                                    <IconI onPress={() => toggleTakenStatus("taken-on-time", item)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
                                </View> }
                                <TouchableOpacity key={item.Supplement.name} onPress={() => onOpen(item)}>
                                    <View style={styles.ListItem}>
                                        <IconI onPress={() => handleStatusToggle(item)}
                                            name={getRadioButtonStatus(item.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(item.taken) }]}></IconI>
                                        {item.time === "" && <Icon onPress={() => changeTime(item)} name="clock" style={styles.IconPadding}/>}
                                        <Text onPress={() => changeTime(item)} style={styles.ListName}>
                                            {item.time !== "" && item.time+": "}
                                        </Text> 
                                        <Text style={styles.ListName}>
                                            {item.Supplement.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Icon onPress={() => removeSupplement(item)}
                                    name="delete-forever" style={{ color: "white", alignSelf: "center" }} size={25}/>
                            </View>
                        )}
                    ></FlatList>
                </View>
            </View>
            <Modalize ref={modalizeRef} modalHeight={height*0.70} onClosed={() => updateModalVisible("hide-modal")}>
                <DailySupplementDetails />
            </Modalize>
        </>
    );
}


const styles = StyleSheet.create({
    ListItem: {
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    ListName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#EEE"
    },
    IconPadding: {
        padding: 1,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    }
});
