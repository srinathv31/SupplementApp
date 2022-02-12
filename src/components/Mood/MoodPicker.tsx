// Source Imports
import React, { useState } from "react";
import DropDownPicker, { ItemType, DropDownDirectionType } from "react-native-dropdown-picker";
import { MoodProps } from "../../interfaces/MoodProps";
import { AppProps } from "../../interfaces/Props";


export default function MoodPicker({ open, setOpen, setMood, setModalVisible, dropDirection, mode }: {
    open: MoodProps["open"], setOpen: MoodProps["setOpen"],
    setMood: AppProps["setMood"], setModalVisible: AppProps["setModalVisible"],
    dropDirection: DropDownDirectionType, mode: "analysis" | "setting"
}): JSX.Element {
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
        setMood(""+item.label);
        setModalVisible({ modal: "mood-modal" });
    }

    function showMood(item: ItemType) {
        setMood(""+item.label);
    }
    
    return(
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={() => setOpen(!open)}
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
        ></DropDownPicker>
    );
}
