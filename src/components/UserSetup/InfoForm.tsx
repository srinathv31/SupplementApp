// Source Imports
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppProps } from "../../interfaces/Props";
import User from "../../interfaces/User";
import { checkIfValidDate } from "../../utilities/authentication/checkForValidDate";
import { createUserDataInCloud } from "../../utilities/authentication/writeUserData";
import { saveUserToPhone } from "../../utilities/saveLoadFunctions/saveUserData";
import AgeBox from "./AgeBox";

export default function InfoForm({ userData, setUserData, setPage }: {
    userData: User, setUserData: (u: User) => void,
    setPage: AppProps["setPage"]
}): JSX.Element {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [selectedForm, setSelectedForm] = useState<"firstName"|"lastName"|"age"|"none">("none");
    const [warningForm, setWarningForm] = useState<("firstName"|"lastName"|"age"|"none")[]>([]);

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
        // If details are valid => update local user object
        // => create new cloud storage with new user => create new local storage
        // => go to loading screen
        updateUserObjDetails();
        setPage("onboarding-screen");
    }

    function updateUserObjDetails() {
        const userCopy = { ...userData };
        
        userCopy.name = name;
        userCopy.lastName = lastName;
        userCopy.age = age;

        createUserDataInCloud(userCopy);
        saveUserToPhone(userCopy);
        setUserData(userCopy);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
        </SafeAreaView>
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
