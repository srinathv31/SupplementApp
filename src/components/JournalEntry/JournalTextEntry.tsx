// Source Imports
import React, { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";


export default function JournalTextEntry(): JSX.Element {
    const { setJournalText, journalText } = useContext(allPropsContext);

    return(
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setJournalText}
                value={journalText}
                multiline
                autoFocus
                placeholder="How did you feel today?"
                placeholderTextColor={"gray"}
                keyboardAppearance="dark"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 300,
        width: 350,
        margin: 12,
        padding: 10,
        color: "white"
    },
});
