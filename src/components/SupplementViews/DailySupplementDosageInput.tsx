import React from "react";
import { StyleSheet, TextInput } from "react-native";
import shallow from "zustand/shallow";
import { SupplementObject } from "../../interfaces/Supplement";
import useClientStore from "../../zustand/clientStore";

export default function DailySupplementDosageInput({ item }: {
    item: SupplementObject
}): JSX.Element {
    const selectedSupplement = useClientStore(state => state.selectedSupplement);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);

    function updateDosage(value: string) {
        if (!value.trim()){
            selectedSupplement.dosage = undefined;
            return;
        }
        const newValue = +value;
        selectedSupplement.dosage = ""+newValue;
        updateSupplementMap(supplementMap);
    }

    return (
        <TextInput
            style={[styles.dosageText, { marginRight: 0 }]}
            defaultValue={!item.dosage ? "0" : item.dosage}
            placeholder={!item.dosage ? "0" : item.dosage}
            placeholderTextColor={"white"}
            keyboardType="decimal-pad"
            onChangeText={(e) => updateDosage(e)}
            clearTextOnFocus
            returnKeyType="done"
        ></TextInput>
    );
}

const styles = StyleSheet.create({
    dosageText: {
        fontSize: 14,
        color: "#eee",
        marginRight: "5%"
    }
});
