// Source Imports
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";


export default function SearchBar({ setQuery, query }: {
    setQuery: (q: string) => void, query: string
}): JSX.Element {
    return(
        <View style={styles.bar}>
            <TextInput
                style={styles.input}
                onChangeText={setQuery}
                value={query}
                placeholder="Search Supplement"
                placeholderTextColor={"gray"}
                returnKeyType="search"
                clearButtonMode="always"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        minWidth: "65%",
        margin: 2,
        borderColor: "#36D1DC",
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 10,
        color: "white"
    },
    bar: {
        alignSelf: "center",
    }
});
