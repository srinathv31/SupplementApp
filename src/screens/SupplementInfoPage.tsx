// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SupplementList from "../assets/SupplementList.json";
import SupplementListView from "../components/SupplementViews/SupplemenListView";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementInfoPage({ setDailyList, dailyList }: {
    setDailyList: (d: Record<string, Supplement[]>) => void, dailyList: Record<string, Supplement[]>
}): JSX.Element {

    function addSupplement(item: Supplement) {
        const dailyListCopy = {...dailyList};
        
        dailyListCopy["12/23"].push(item);
        Object.values(dailyListCopy["12/23"]).forEach( supplement => {
            if (supplement === item) {
                supplement.time = "7:00AM";
            }
        });

        setDailyList(dailyListCopy);
    }

    return(
        <SupplementListView
            setDailyList={setDailyList}
            dailyList={dailyList}
            fontSizeNumber={24}
        ></SupplementListView>
    );
}

const styles = StyleSheet.create({
    ListItem: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: "center",
      padding: 5,
      margin: 10,
      color: "white",
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: "orange",
      overflow:"hidden"
    }
});
