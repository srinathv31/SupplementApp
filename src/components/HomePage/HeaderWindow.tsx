// Source Imports
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import { allPropsContext } from "../../contextHooks/AllPropsContext";


export default function HeaderWindow(): JSX.Element {
    const { daySelected } = useContext(allPropsContext);

    return(
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <UserPageButton />
            <PrevDayButton />
            <Text style={styles.sectionTitle}>{daySelected}</Text>
            <NextDayButton />
            <JournalEntryModal />
            <JournalButton />
            <TimePicker />
            <DosagePickerModal />
            <MultipleDatePicker />
            <AchievementScreen />
            <EditNameModal />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        padding: 10,
        margin: 12,
        color: "white"
    }
});
