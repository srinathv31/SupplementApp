// Source Imports
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/Ionicons";
import { View, FlatList, TouchableHighlight, Pressable, Text } from "react-native";
import { styles } from "../../../styles/WeekStyles";
import { WeekProps } from "../../../interfaces/WeekProps";
import { WeekDay } from "../../../interfaces/WeekDay";
import { convertWeekDayToDateData, generateWeekList, getDateString, grabMonth } from "../../../utilities/getCurrentDate";
import handleCalendar from "../../../utilities/handleCalendarEvents";
import { SupplementObject } from "../../../interfaces/Supplement";
import saveUserData from "../../../utilities/saveLoadFunctions/saveUserData";
import { DateData } from "react-native-calendars/src/types";
import { AppProps } from "../../../interfaces/Props";
import { allPropsContext } from "../../../contextHooks/AllPropsContext";

export default function AgendaBody({ setShowStatusButtons, showStatusButtons }: WeekProps): JSX.Element {
    const { setSupplementMap, supplementMap, setUserData, userData, setSwipeAnimation, setObjDaySelected, setDaySelected, setWeek, setMonthText, setSelectedSupplement, setIndex, setModalVisible, week, daySelected, selectedSupplement  } = useContext(allPropsContext);

    function removeSupplement(item: SupplementObject, parentData: WeekDay) {
        const supplementMapCopy = { ...supplementMap };
        const parentDataMapKey = parentData.dateString;
        const parentDayDateData = convertWeekDayToDateData(parentData);
        const userCopy = { ...userData };

        supplementMapCopy[parentDataMapKey].SupplementSchedule = supplementMapCopy[parentDataMapKey].SupplementSchedule.filter(listItem => listItem !== item);
        userCopy.data.selectedDates = removeDate(parentDayDateData, supplementMapCopy, parentDataMapKey);
        if (Object.values(supplementMapCopy[parentDataMapKey].SupplementSchedule).length === 0 && supplementMapCopy[parentDataMapKey].JournalEntry === "") {
            delete supplementMapCopy[parentDataMapKey];
        }
        
        setUserData(userCopy);
        saveUserData(userData, setUserData, supplementMapCopy);
        setSupplementMap(supplementMapCopy);
        handleDayClick(parentData);
    }

    function removeDate(day: DateData, supplementMap: AppProps["supplementMap"], parentDataMapKey: string){
        const selectedDatesCopy = { ...userData.data.selectedDates };
        const stringDate = day.dateString;
        if (Object.values(supplementMap[parentDataMapKey].SupplementSchedule).length === 0){
            selectedDatesCopy[stringDate].dots = selectedDatesCopy[stringDate].dots.filter(item => item.key !== "supplementCheck") as [{key: string, color: string}];
        }
        return selectedDatesCopy;
    }

    function handleDayClick(weekDay: WeekDay) {
        const weekDayDateData = convertWeekDayToDateData(weekDay);
        const userCopy = { ...userData };

        setSwipeAnimation("fadeIn");

        setObjDaySelected(weekDayDateData);
        setDaySelected(getDateString(weekDayDateData));

        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, weekDayDateData.dateString);
        setUserData(userCopy);

        setWeek(generateWeekList(weekDayDateData));
        setMonthText(grabMonth(generateWeekList(weekDayDateData)));
    }

    function changeTime(item: SupplementObject, parentData: WeekDay) {
        handleDayClick(parentData);
        setSelectedSupplement(item);
        setIndex(1);
        setModalVisible("time-modal");
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
    }

    function handleStatusToggle(item: SupplementObject) {
        setSwipeAnimation("fadeIn");
        setSelectedSupplement(item);
        setShowStatusButtons(!showStatusButtons);
    }

    return(
        <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon name="drag-vertical" style={styles.IconDrag}/>
            <FlatList
                data={week}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => { 
                    const parentData = item; 
                    return (
                        <TouchableHighlight key={item.date}>
                            <View style={styles.ListItem}>
                                <Pressable onPress={() => (handleDayClick(item), setModalVisible("hide-modal"), setIndex(1))}>
                                    <Text style={{ fontSize: 24, color: daySelected === item.dateString ? "orange" : "white" }}>{item.date}</Text>
                                </Pressable>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: daySelected === item.dateString ? "orange" : "white" }}>{item.day}</Text>
                                <FlatList
                                    data={supplementMap[item.dateString] === undefined ? [] : supplementMap[item.dateString].SupplementSchedule}
                                    renderItem={({ item }) => (
                                        <TouchableHighlight key={item.Supplement.name}>
                                            <View style={styles.SuppItem}>
                                                { (selectedSupplement === item && showStatusButtons) && <View style={{ flexDirection: "row", marginHorizontal: 3 }}>
                                                    <IconI onPress={() => toggleTakenStatus("not-taken", item)} name={"radio-button-off-outline"} style={[styles.IconPadding, { color: "#EEE" }]}></IconI>
                                                    <IconI onPress={() => toggleTakenStatus("taken-off-time", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "#fcc623" }]}></IconI>
                                                    <IconI onPress={() => toggleTakenStatus("missed", item)} name={"radio-button-on-outline"} style={[styles.IconPadding, { color: "red" }]}></IconI>
                                                    <IconI onPress={() => toggleTakenStatus("taken-on-time", item)} name={"checkmark-circle"} style={[styles.IconPadding, { color: "#28c916" }]}></IconI>
                                                </View> }
                                                <IconI onPress={() => handleStatusToggle(item)}
                                                    name={getRadioButtonStatus(item.taken)} style={[styles.IconPadding, { color: getRadioButtonColor(item.taken) }]}></IconI>
                                                {item.time === "" && <Icon onPress={() => changeTime(item, parentData)} name="clock" style={styles.IconPadding}/>}
                                                <Text onPress={() => changeTime(item, parentData)} style={styles.ListName}>{item.time !== "" && item.time +":"} </Text>
                                                <Text style={styles.ListName}> {item.Supplement.name}</Text>
                                                <Icon onPress={() => removeSupplement(item, parentData)}
                                                    name="delete-forever" style={styles.IconPadding}/>
                                            </View>
                                        </TouchableHighlight>
                                    )}
                                ></FlatList>
                            </View>
                        </TouchableHighlight>
                    );}}
            ></FlatList>
            <Icon name="drag-vertical" style={styles.IconDrag}/>
        </View>
    );
}
