// Source Imports
import React, { useState } from "react";
import { Dimensions } from "react-native";
import DropDownPicker, { ItemType, DropDownDirectionType } from "react-native-dropdown-picker";
import shallow from "zustand/shallow";
import useClientStore from "../../zustand/clientStore";

export default function MoodPicker({ dropDirection, mode }: {
    dropDirection: DropDownDirectionType, mode: "analysis" | "setting"
}): JSX.Element {
    const updateMood = useClientStore(state => state.updateMood);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { openMoodPicker, updateOpenMoodPicker } = useClientStore(state => ({ openMoodPicker: state.openMoodPicker, updateOpenMoodPicker: state.updateOpenMoodPicker }), shallow);

    const { height: initialHeight } = Dimensions.get("window");

    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        { label: "Energetic", value: "Energetic" },
        { label: "Focused", value: "Focused" },
        { label: "Motivated", value: "Motivated" },
        { label: "Peaceful", value: "Peaceful" },
        { label: "Optimistic", value: "Optimistic" },
        { label: "Calm", value: "Calm" },
        { label: "Lively", value: "Lively" },
        { label: "Relaxed", value: "Relaxed" },
        { label: "Fatigued", value: "Fatigued" },
        { label: "Unfocused", value: "Unfocused" },
        { label: "Scatter Brained", value: "Scatter Brained" },
        { label: "Anxious", value: "Anxious" },
        { label: "Cynical", value: "Cynical" },
        { label: "Discontented", value: "Discontented" },
        { label: "Irritability", value: "Irritability" },
        { label: "Difficulty Sleeping", value: "Difficulty Sleeping" },
        { label: "Unmotivated", value: "Unmotivated" },
        { label: "Depressed", value: "Depressed" },
    ]);

    function addMood(item: ItemType) {
        updateMood(""+item.label);
        updateModalVisible("mood-modal");
    }

    function showMood(item: ItemType) {
        updateMood(""+item.label);
    }
    
    return(
        <DropDownPicker
            open={openMoodPicker}
            value={value}
            items={items}
            setOpen={() => updateOpenMoodPicker(!openMoodPicker)}
            setItems={setItems}
            setValue={() => setValue}
            theme="DARK"
            dropDownDirection={dropDirection}
            textStyle={{ fontSize: 15, color: "white", textAlign: "center" }}
            labelStyle={{ fontSize: 15, textAlign: "center" }}
            containerStyle={{ width: "80%", alignSelf: "center", opacity: 0.95 }}
            searchable
            placeholder="Select A Mood for the Day"
            searchPlaceholder="Start Typing a Mood"
            onSelectItem={(item) => {
                mode === "setting" ? addMood(item) : showMood(item);
            }}
            maxHeight={initialHeight*0.55}
        ></DropDownPicker>
    );
}
