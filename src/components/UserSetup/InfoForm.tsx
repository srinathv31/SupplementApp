// Source Imports
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { checkIfValidDate } from "../../utilities/authentication/checkForValidDate";
import AgeBox from "./AgeBox";

export default function InfoForm(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [selectedForm, setSelectedForm] = useState<"firstName"|"lastName"|"age"|"none">("none");
    const [warningForm, setWarningForm] = useState<("firstName"|"lastName"|"age"|"none")[]>([]);
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

    // Eliminate whitespace from names
    useEffect(() => {
        setName(name.trim());
        setLastName(lastName.trim());
    }, [name, lastName]);

    function handleSubmit() {
        const warningList: ("firstName"|"lastName"|"age"|"none")[] = [];
        if (name === "") {
            warningList.push("firstName");
        }
        if (lastName === "") {
            warningList.push("lastName");
        }
        if (!checkIfValidDate(age)) {
            warningList.push("age");
        }
        setWarningForm(warningList);
        if (warningList.length > 0) {
            console.log("Invalid Entries");
            return;
        }
        console.log("First name: " + "***"+name+"***");
        console.log("Last name: " + "***"+lastName+"***");
        console.log("Valid Entries");
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center" }} behavior={"padding"}>
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>{"Let's Get Your Details"}</Text>
            <View style={styles.bar}>
                <TextInput
                    style={[styles.input, { borderBottomColor: warningForm.includes("firstName") === true ? "crimson" : selectedForm === "firstName" ? "#36D1DC" : "gray" }]}
                    onChangeText={setName}
                    value={name}
                    placeholder="Enter First Name"
                    placeholderTextColor={"gray"}
                    onFocus={() => setSelectedForm("firstName")}
                    onSubmitEditing={() => setSelectedForm("none")}
                    returnKeyType="next"
                />
                <Text style={{ color: warningForm.includes("firstName") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>First Name</Text>
            </View>
            <View style={styles.bar}>
                <TextInput
                    style={[styles.input, { borderBottomColor: warningForm.includes("lastName") === true ? "crimson" : selectedForm === "lastName" ? "#36D1DC" : "gray" }]}
                    onChangeText={setLastName}
                    value={lastName}
                    placeholder="Enter Last Name"
                    placeholderTextColor={"gray"}
                    onFocus={() => setSelectedForm("lastName")}
                    onSubmitEditing={() => setSelectedForm("none")}
                    returnKeyType="next"
                />
                <Text style={{ color: warningForm.includes("lastName") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>Last Name</Text>
            </View>
            <AgeBox
                setSelectedForm={setSelectedForm}
                selectedForm={selectedForm}
                setAge={setAge}
                age={age}
                warningForm={warningForm}
            ></AgeBox>
            <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={{ width: "80%", alignSelf: "center", borderRadius: 10, margin: 20 }}>
                <Text onPress={() => handleSubmit()} style={styles.button}>Continue</Text>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 50,
        minWidth: "65%",
        margin: 12,
        borderColor: "#36D1DC",
        borderBottomWidth: 1,
        padding: 10,
        paddingTop: 10,
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
