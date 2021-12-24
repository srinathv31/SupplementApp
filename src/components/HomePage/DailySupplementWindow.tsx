// Source Imports
import React from "react";
import { Text, View } from "react-native";

// Component Imports

// Design Imports

export default function DailySupplementWindow(): JSX.Element {
    return(
        <>
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 10, marginBottom: 5, marginLeft: 25, marginRight: 25}}>
                <Text style={{fontSize: 18, fontWeight: "600"}}>7:00AM: Recommended Supplement</Text>
            </View>
            <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 5, marginLeft: 25, marginRight: 25}}>
                <Text style={{fontSize: 18, fontWeight: "600"}}>10:00AM: Recommended Supplement</Text>
            </View>
        </>
    );
}
