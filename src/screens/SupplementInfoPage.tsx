// Source Imports
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SupplementList from "../assets/SupplementList.json";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementInfoPage({ setDailyList, dailyList }: {
    setDailyList: (d: Record<string, Supplement[]>) => void, dailyList: Record<string, Supplement[]>
}): JSX.Element {
    const [query, setQuery] = useState<string>("");

    return(
        <View>
            <SearchBar
                setQuery={setQuery}
                query={query}
            ></SearchBar>
            <SupplementListView
                setDailyList={setDailyList}
                dailyList={dailyList}
                fontSizeNumber={24}
                query={query}
            ></SupplementListView>
        </View>
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
