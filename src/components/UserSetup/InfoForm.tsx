// Source Imports
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function InfoForm(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<string>("");

    // useEffect(() => {
    //     const queryCopy = { ...query };
    //     queryCopy["1"] = name;
    //     setQuery(queryCopy);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [name]);

    // useEffect(() => {
    //     const queryCopy = { ...query };
    //     queryCopy["2"] = age;
    //     setQuery(queryCopy);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [age]);

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.bar}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Enter Name"
                />
            </View>
            <View style={styles.bar}>
                <TextInput
                    style={styles.input}
                    onChangeText={setAge}
                    value={age}
                    placeholder="Enter Age"
                />
            </View>
            <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={{ width: "80%", alignSelf: "center", borderRadius: 10, margin: 20 }}>
                <Text style={styles.button}>Continue</Text>
            </LinearGradient>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#36D1DC",
        padding: 10,
        paddingTop: 10,
        backgroundColor: "#163059",
        color: "white"
    },
    bar: {
        alignSelf: "center",
    },
    button: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        padding: 10,
        paddingTop: 10,
        textAlign: "center",
        color: "white",
        fontSize: 23,
        fontWeight: "600"
    }
});
