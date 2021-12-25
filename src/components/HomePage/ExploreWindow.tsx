// Source Imports
import React from "react";
import { Text, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";

// Component Imports

// Design Imports

export default function ExploreWindow(): JSX.Element {
    return(
        <View style={{flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "20%", borderRadius: 10, padding: 10, margin: 10}}>
          <Text style={{fontSize: 22, fontWeight: "600"}}>Explore</Text>
          <Text>{SupplementList[0].name}</Text>
          <Text>{SupplementList[0].description}</Text>
        </View>
    );
}
