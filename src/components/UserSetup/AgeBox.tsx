// Source Imports
import React, { useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function AgeBox({ setAge, age, setSelectedForm, warningForm, selectedForm }: {
    setAge: (a: string) => void, age: string,
    setSelectedForm: (f: "firstName"|"lastName"|"age"|"none") => void, selectedForm: "firstName"|"lastName"|"age"|"none",
    warningForm: ("firstName"|"lastName"|"age"|"none")[]
}): JSX.Element {

    useEffect(() => {
        if (age[0] > "1"){
            setAge(age.padStart(2, "0"));
        }
        if (age[0] === "1"){
            if (age[1] > "2") {
                setAge(age.slice(0,-1));
                return;
            }
        }
        if(age.length === 2) {
            setAge(age+"/");
        }
        if (age[3] > "3"){
            setAge(age.substring(0,3)+"0"+age[3]+"/");
        }
        if (age[3] === "3"){
            if (age[4] > "1") {
                setAge(age.slice(0,-1));
                return;
            }
        }
        if(age.length === 5) {
            setAge(age+"/");
        }
    }, [age]);

    return(
        <View style={styles.bar}>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={[styles.input, { borderBottomColor: warningForm.includes("age") === true ? "crimson" : selectedForm === "age" ? "#36D1DC" : "gray" }]}
                    onChangeText={setAge}
                    value={age}
                    placeholder="Enter Age"
                    placeholderTextColor={"gray"}
                    onFocus={() => setSelectedForm("age")}
                    onSubmitEditing={() => setSelectedForm("none")}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={10}
                    clearTextOnFocus
                    selectTextOnFocus
                />
            </View>
            <Text style={{ color: warningForm.includes("age") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>Age (MM/DD/YYYY)</Text>
        </View>
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
