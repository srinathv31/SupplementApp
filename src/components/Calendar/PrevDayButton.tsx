// Source Imports
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import shallow from "zustand/shallow";
import { generatePrevDate } from "../../utilities/generateNextDate";
import handleCalendar from "../../utilities/handleCalendarEvents";
import useClientStore from "../../zustand/clientStore";

export default function PrevDayButton(): JSX.Element {
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const modalVisible = useClientStore(state => state.modalVisible);
    const updateDaySelected = useClientStore(state => state.updateDaySelected);
    const { objDaySelected, updateObjDaySelected } = useClientStore(state => ({ objDaySelected: state.objDaySelected, updateObjDaySelected: state.updateObjDaySelected }), shallow);

    function grabPrevDay() {
        const day = { ...objDaySelected };
        const userCopy = { ...userData };
        let copyDate = day;

        // Current Date Info to compare
        const date = day.day;
        const month = day.month;
        const year = day.year;

        // Based on month set max days - reset day to 31/30/(28/29)
        copyDate = generatePrevDate(copyDate, date, month, year);

        // Setting new date string
        let stringDay = ""+copyDate.day;
        let stringMonth = ""+copyDate.month;

        copyDate.day < 10 ? stringDay = ""+"0"+copyDate.day : stringDay = ""+copyDate.day;
        copyDate.month < 10 ? stringMonth = ""+"0"+copyDate.month : stringMonth = ""+copyDate.month;

        copyDate.dateString = ""+copyDate.year + "-" + stringMonth + "-" + stringDay;
        
        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, copyDate.dateString);
        updateUserData(userCopy);

        updateObjDaySelected(copyDate);

        const prevDate = ""+copyDate.month + "/" + ""+copyDate.day + "/" + ""+copyDate.year;
        updateDaySelected(prevDate);
    }
    
    return(
        <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => grabPrevDay()}
            disabled={modalVisible === "disable-header"}
        >
            <Text style={styles.buttonText}>
                <Icon name="chevron-left" style={{ color: "white", alignSelf: "center" }} size={20}/>
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#31425c",
        borderRadius: 8,
        padding: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});
