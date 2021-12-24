// Source Imports
import React from "react";
import { Text, View } from "react-native";

// Component Imports

// Design Imports

export default function ExploreWindow(): JSX.Element {
    return(
        <View style={{flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "35%", borderRadius: 10, padding: 10, margin: 10}}>
          <Text style={{fontSize: 22, fontWeight: "600"}}>Explore</Text>
          <Text>Supplement</Text>
          <Text>Info</Text>
        </View>
    );
}
