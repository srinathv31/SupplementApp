// Source Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
// import { AppProps } from "../../interfaces/Props";
import RadioForm from "react-native-simple-radio-button";
import Icon from "react-native-vector-icons/Ionicons";

export default function WaterSurveyForm({ formType }: {
    formType: string
}): JSX.Element {
    const [genderAnswer, setGenderAnswer] = useState<string>("");
    const [warningForm, setWarningForm] = useState<("weight"|"none")[]>([]);
    const [weight, setWeight] = useState<string>("");
    const [selectedForm, setSelectedForm] = useState<"weight"|"none">("none");

    // Eliminate whitespace from names
    useEffect(() => {
        setWeight(weight.trim());
    }, [weight]);

    interface WaterQuestions {
        label: string,
        value: number
    }

    const radio_props: Record<string, WaterQuestions[]> = { 
        "1": 
        [
            { label: "Male", value: 0 },
            { label: "Female", value: 1 },
        ],
        "2": 
        [
            { label: "Water", value: 0 },
            { label: "Soda", value: 1 },
            { label: "Prefer Not To Answer", value: 2 },
        ],
        "3": 
        [
            { label: "Apple", value: 0 },
            { label: "Pear", value: 1 },
            { label: "Prefer Not To Answer", value: 2 },
        ]

    };

    return(
        <View style={{ backgroundColor: "#0B172A", padding: 40, paddingVertical: 20, margin: 5, borderRadius: 10 }}>
            {formType === "1" && 
            <>
                <Text style={{ color: "white", textAlign: "center", fontSize: 18, paddingBottom: 5 }}>What is your birth sex?</Text>
                <Text style={{ color: "white", textAlign: "center", fontSize: 12, paddingBottom: 20 }}>Compared with women, men generally need more fluid because they have higher body mass and lower body fat, and they burn more calories each day.</Text>
                <RadioForm
                    initial={-1}
                    radio_props={radio_props[formType]}
                    buttonColor={"#50C900"}
                    labelColor={"white"}
                    // selectedButtonColor={"#50C900"}
                    // selectedLabelColor={"white"}
                    onPress={(value) => {
                        console.log(radio_props[formType][value].label);
                        setGenderAnswer(radio_props[formType][value].label);
                    }}
                />
            </>}
            {formType === "2" && 
            <>
                <Text style={{ color: "white", textAlign: "center", fontSize: 18, paddingBottom: 5 }}>What is your weight?</Text>
                <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>{"As your weight increases, so does the amount of muscle and blood in your body. You'll need more fluid to support these tissues."}</Text>
                <View style={styles.bar}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                            style={[styles.input, { borderBottomColor: warningForm.includes("weight") === true ? "crimson" : selectedForm === "weight" ? "#36D1DC" : "gray" }]}
                            onChangeText={setWeight}
                            value={weight}
                            placeholder="Enter Weight"
                            placeholderTextColor={"gray"}
                            onFocus={() => setSelectedForm("weight")}
                            onSubmitEditing={() => setSelectedForm("none")}
                            returnKeyType="done"
                            keyboardType="decimal-pad"
                        />
                        <Text style={{ color: "white", fontSize: 15 }}>{"lbs"}</Text>
                    </View>
                    <Text style={{ color: warningForm.includes("weight") === true ? "crimson" : "gray", fontSize: 10, marginHorizontal: 12, paddingHorizontal: 10 }}>Weight</Text>
                </View>
            </>}
            {formType === "3" && 
            <View>
                <Text style={{ color: "white", textAlign: "center", fontSize: 18, paddingBottom: 10 }}>
                    <Icon name="information-circle-outline" size={18} color={"white"}></Icon>
                    {"About This Calculator"}
                </Text>
                <Text style={{ color: "white", textAlign: "left", fontSize: 12, paddingBottom: 5 }}>
                    {"Hydration calculations are estimated for adults 18 years old and up. Calculations estimate the minimum amount of water you should be drinking each day for a well-hydrated body. On days when you are more active or work up a sweat you should consume more water.\n\nThis tool does not provide medical advice. It is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment."}
                </Text>
            </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    modalView: {
        width: "75%", padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 40,
        elevation: 2,
        width: 125,
        alignSelf: "center"
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    },
    input: {
        height: 50,
        minWidth: "25%",
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
    button1: {
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
