// Source Imports
import React from "react";
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Divider from "../Design/Divider";
import useClientStore from "../../zustand/clientStore";
import IconI from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";

import { SupplementDetails, SupplementDetailsMap } from "../../interfaces/SupplementDetails";
import SupplementDetailsJSON from "../../assets/SupplementDetails.json";
import FoodRDAGraph from "./AboutSupplementView/FoodRDAGraph";
const supplementDetailsMap: SupplementDetailsMap = SupplementDetailsJSON;

export default function AboutSupplementDetails({ setInfoMode }: {
    setInfoMode: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
    const selectedSupplement = useClientStore(state => state.selectedSupplement);

    const selectedSupplementDetails: SupplementDetails = supplementDetailsMap[selectedSupplement.Supplement.name];

    const handleMoreInfo = () => {
        setInfoMode(false);
    };

    if (!Object.keys(SupplementDetailsJSON).includes(selectedSupplement.Supplement.name)) {
        return (
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.modalContent}>
                    <Text style={styles.cardText}>{selectedSupplement.Supplement.name}</Text>
                    <Divider length="small"></Divider>
                
                    <Text style={{ color: "white", fontSize: 21, alignSelf: "baseline", padding: 10, fontWeight: "bold" }}>More Details Coming Soon!</Text>
                    <Text style={{ color: "white", fontSize: 18, alignSelf: "baseline", padding: 10, fontWeight: "300" }}>In the meantime click for more info below</Text>
                    <Divider length="full"></Divider>
                    <TouchableOpacity onPress={handleMoreInfo}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10, marginVertical: 10  }}>
                            <Text style={{ color: "#02baf1", fontSize: 18, alignSelf: "center", marginHorizontal: 5 }}>Click For More Details</Text>
                            <IconF name="external-link" style={{ color: "#02baf1" }} size={18} />
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }

    const foods = 
    Object.keys(SupplementDetailsJSON).includes(selectedSupplement.Supplement.name) ?    
        [
            { "food": selectedSupplementDetails["Food 1"], "amt": selectedSupplementDetails["Food 1 Amount"] },
            { "food": selectedSupplementDetails["Food 2"], "amt": selectedSupplementDetails["Food 2 Amount"] },
            { "food": selectedSupplementDetails["Food 3"], "amt": selectedSupplementDetails["Food 3 Amount"] },
            { "food": selectedSupplementDetails["Food 4"], "amt": selectedSupplementDetails["Food 4 Amount"] },
            { "food": selectedSupplementDetails["Food 5"], "amt": selectedSupplementDetails["Food 5 Amount"] },
        ].sort((item0, item1) => (+item1.amt)-(+item0.amt)) : [];

    return(
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View style={styles.modalContent}>
                <Text style={styles.cardText}>{selectedSupplement.Supplement.name}</Text>
                <Divider length="small"></Divider>
                
                <Text style={{ color: "white", fontSize: 21, alignSelf: "baseline", padding: 10, fontWeight: "bold" }}>Description</Text>
                <Divider length="full"></Divider>
                <Text style={{ color: "white", fontSize: 14, padding: 10 }}>{selectedSupplementDetails?.Description}</Text>
                <Text style={{ color: "white", fontSize: 21, alignSelf: "baseline", padding: 10, fontWeight: "bold" }}>Details</Text>
                <Divider length="full"></Divider>
                <View style={{ display: "flex", flexDirection: selectedSupplementDetails.SecondaryUse.trim().length > 13 ? "column" : "row" }}>
                    <Text style={{ color: "white", fontSize: 14, alignSelf: "baseline", padding: 10, paddingVertical: 5, paddingRight: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Primary Use:</Text> {selectedSupplementDetails.PrimaryUse}</Text>
                    {selectedSupplementDetails.SecondaryUse.trim() ? <Text style={{ color: "white", fontSize: 14, alignSelf: "baseline", padding: 10, paddingVertical: 5, paddingRight: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Secondary:</Text> {selectedSupplementDetails.SecondaryUse}</Text> : null}
                </View>
                <Text style={{ color: "white", fontSize: 14, alignSelf: "baseline", padding: 10, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>RDA:</Text> {selectedSupplementDetails.RDA} {selectedSupplementDetails.UOM}</Text>
                {selectedSupplementDetails.AltName.trim() ? <Text style={{ color: "white", fontSize: 14, alignSelf: "baseline", padding: 10, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Alternative Name:</Text> {selectedSupplementDetails.AltName}</Text> : null}
                <Text style={{ color: "white", fontSize: 21, alignSelf: "baseline", padding: 10, fontWeight: "bold" }}>Top Food Sources</Text>
                <Divider length="full"></Divider>
                {foods.map((item, index) => {
                    return (
                        <View key={index} style={styles.foodCard}>
                            <IconI name="fast-food" style={{ color: "white", width: "20%" }} size={23} />
                            <View style={styles.foodLabel}>
                                <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>{item.food}</Text>
                                <Text style={{ color: "white", fontSize: 12, fontWeight: "300" }}>{item.amt} {selectedSupplementDetails.UOM}</Text>
                            </View>
                            <View style={{ width: "20%" }}>
                                <FoodRDAGraph foodRDA={+item.amt} totalRDA={+selectedSupplementDetails.RDA} />
                            </View>
                        </View>
                    );
                })}
                <Text style={{ color: "white", fontSize: 21, alignSelf: "baseline", padding: 10, fontWeight: "bold" }}>More Information</Text>
                <Divider length="full"></Divider>
                <TouchableOpacity onPress={handleMoreInfo}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10, marginVertical: 10  }}>
                        <Text style={{ color: "#02baf1", fontSize: 18, alignSelf: "center", marginHorizontal: 5 }}>Click For More Details</Text>
                        <IconF name="external-link" style={{ color: "#02baf1" }} size={18} />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "#112442",
        minHeight: "100%",
        padding: 10,
        flex: 1,
    },
    input: {
        height: 300,
        width: 350,
        margin: 12,
        padding: 10,
        color: "white"
    },
    IconPadding: {
        paddingHorizontal: 1,
        paddingVertical: 10,
        margin: 1,
        fontSize: 18,
        color: "#EEE"
    },
    IconTimelinePadding: {
        paddingHorizontal: 1,
        fontSize: 18,
        color: "#EEE",
        alignSelf: "center",
        marginTop: -11
    },
    buttonText: {
        paddingHorizontal: 5
    },
    cardText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        padding: 5,
        marginBottom: 5,
        fontWeight: "600"
    },
    foodCard: {
        padding: 10, 
        margin: 7,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        
    },
    foodLabel: {
        display: "flex",
        flexDirection: "column",
        width: "60%"
    }
});
