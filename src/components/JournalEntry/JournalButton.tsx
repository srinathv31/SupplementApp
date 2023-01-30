// Source Imports
import React from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import shallow from "zustand/shallow";
import useClientStore from "../../zustand/clientStore";

export default function JournalButton({ setJournalText }: {
    setJournalText: (j: string) => void
}): JSX.Element {
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const { updateModalVisible, modalVisible } = useClientStore(state => ({ updateModalVisible: state.updateModalVisible, modalVisible: state.modalVisible }), shallow);
    const daySelected = useClientStore(state => state.daySelected);

    function HandleJournalOpen() {
        const supplementMapCopy = { ...supplementMap };

        if (supplementMapCopy[daySelected] === undefined) {
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: [] };
        }
        if (supplementMapCopy[daySelected].JournalEntry === "") {
            setJournalText("");
        } else {
            setJournalText(supplementMapCopy[daySelected].JournalEntry);
        }
		
        updateSupplementMap(supplementMapCopy);
        updateModalVisible("journal");
    }

    return(
        <>
            <Pressable 
                onPress={() => HandleJournalOpen()}
                disabled={modalVisible === "disable-header"}
            >
                <Icon
                    style={{ padding: 10,
                        margin: 12 }}
                    name="create-outline" size={30} color={supplementMap[daySelected] !== undefined && supplementMap[daySelected].JournalEntry !== "" ? "lime" : "white"}
                />
            </Pressable>
        </>
    );
}
