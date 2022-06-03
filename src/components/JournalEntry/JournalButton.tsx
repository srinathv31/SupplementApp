// Source Imports
import React, { useContext } from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { allPropsContext } from "../../contextHooks/AllPropsContext";


export default function JournalButton({ setJournalText }: {
    setJournalText: (j: string) => void
}): JSX.Element {
    const { setSupplementMap, supplementMap, setModalVisible, modalVisible, daySelected } = useContext(allPropsContext);

    function HandleJournalOpen() {
        const supplementMapCopy = { ...supplementMap };

        if (supplementMapCopy[daySelected] === undefined) {
            supplementMapCopy[daySelected] = { SupplementSchedule: [], JournalEntry: "", DailyMood: 
            { 
                "1": { mood: "", range: 0, TimelineData: [] },
                "2": { mood: "", range: 0, TimelineData: [] },
                "3": { mood: "", range: 0, TimelineData: [] }
            } };
        }
        if (supplementMapCopy[daySelected].JournalEntry === "") {
            setJournalText("");
        } else {
            setJournalText(supplementMapCopy[daySelected].JournalEntry);
        }
		
        setSupplementMap(supplementMapCopy);
        setModalVisible("journal");
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
