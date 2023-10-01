// Source Imports
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserPageButton from "./UserPageButton";
import NextDayButton from "../Calendar/NextDayButton";
import PrevDayButton from "../Calendar/PrevDayButton";
import JournalButton from "../JournalEntry/JournalButton";
import JournalEntryModal from "../JournalEntry/JournalEntryModal";
import TimePicker from "../SupplementViews/TimePicker";
import MultipleDatePicker from "../SupplementViews/MultipleDatePicker";
import DosagePickerModal from "../SupplementViews/DosagePickerModal";
import AchievementScreen from "../../screens/AchievementScreen";
import EditNameModal from "../User/EditNameModal";
import JournalTextEntry from "../JournalEntry/JournalTextEntry";
import JournalCloseButton from "../JournalEntry/JournalCloseButton";
import useClientStore from "../../zustand/clientStore";
import getCurrentDate, { generateCurrentDateObject } from "../../utilities/getCurrentDate";
import handleCalendar from "../../utilities/handleCalendarEvents";
import WaterAdder from "../WaterTracking/WaterAdder";
import WaterResetter from "../WaterTracking/WaterResetter";
import WaterGoalSetter from "../WaterTracking/WaterGoalSetter";

export default function HeaderWindow(): JSX.Element {
    const daySelected = useClientStore(state => state.daySelected);
    const updateDaySelected = useClientStore(state => state.updateDaySelected);
    const userData = useClientStore(state => state.userData);
    const updateUserData = useClientStore(state => state.updateUserData);
    const updateObjDaySelected = useClientStore(state => state.updateObjDaySelected);

    const [journalText, setJournalText] = useState<string>("");

    function goToPresentDay() {
        const userCopy = { ...userData };
        const presentDate = getCurrentDate();
        updateDaySelected(presentDate);

        const presentDateObj = generateCurrentDateObject();
        const presentDateObjCopy = { ...presentDateObj };

        userCopy.data.selectedDates = handleCalendar(userData.data.selectedDates, presentDateObjCopy.dateString);
        updateUserData(userCopy);
        updateObjDaySelected(presentDateObjCopy);
    }

    function isPresentDate() {
        const presentDate = getCurrentDate();
        return presentDate === daySelected;
    }

    return(
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <UserPageButton />
            <PrevDayButton />
            <TouchableOpacity onPress={() => goToPresentDay()} style={{ padding: 10 }}>
                <Text style={[styles.sectionTitle, { color: isPresentDate() ? "#02baf1" : "#eee" }]}>{daySelected}</Text>
            </TouchableOpacity>
            <NextDayButton />

            <JournalEntryModal>
                <JournalTextEntry setJournalText={setJournalText} journalText={journalText}/>
                <JournalCloseButton journalText={journalText} />
            </JournalEntryModal>

            <JournalButton setJournalText={setJournalText}/>

            {/* Modals */}
            <TimePicker />
            <DosagePickerModal />
            <MultipleDatePicker />
            <AchievementScreen />
            <EditNameModal />
            <WaterAdder />
            <WaterResetter />
            <WaterGoalSetter />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: "300",
        textAlign: "center",
        padding: 10,
        backgroundColor: "#31425c",
        borderRadius: 10,
        overflow: "hidden"
    },
});
