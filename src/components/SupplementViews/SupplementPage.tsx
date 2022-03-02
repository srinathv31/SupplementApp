// Source Imports
import React from "react";
import { ScrollView, Text } from "react-native";
import Divider from "../Design/Divider";
import { SupplementObject } from "../../interfaces/Supplement";

export default function SupplementPage({ supplementObj }: {
	supplementObj: SupplementObject
}): JSX.Element {
    const supplement = supplementObj.Supplement;

    return(
        <ScrollView style={{ padding: 10 }}>
            <Text style={{ color: "white", fontSize: 28, alignSelf: "center", padding: 10 }}>{supplement.name}</Text> 
            <Divider length="small"></Divider>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>What is It?</Text>
            <Divider length="full"></Divider>
            <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{supplement.description}</Text>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>What Are the Benefits?</Text>
            <Divider length="full"></Divider>
            <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{supplement.benefits}</Text>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Is it Safe?</Text>
            <Divider length="full"></Divider>
            <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{supplement.safe}</Text>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600", padding: 10 }}>Any Side Effects?</Text>
            <Divider length="full"></Divider>
            <Text style={{ color: "white", fontSize: 18, padding: 10 }}>{supplement.sideEffects}</Text>
        </ScrollView>
    );
}
