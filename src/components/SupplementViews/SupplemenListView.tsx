// Source Imports
import React from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import Supplement from "../../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementListView({ setDailyList, dailyList, fontSizeNumber }: {
    setDailyList: (d: Record<string, Supplement[]>) => void, dailyList: Record<string, Supplement[]>,
    fontSizeNumber: number
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
        <View style={{alignSelf: "center"}}>
            { fontSizeNumber === 24 && <Text style={{color: "white", fontSize: fontSizeNumber}}>Supplement Info</Text>} 
            <FlatList
                data={SupplementList}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                      key={item.name}
                      onPress={() => addSupplement(item)}
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}>
                      <View>
                        <Text style={fontSizeNumber === 24 ? styles.ListItem : styles.ListItemSmall}>{item.name}</Text>
                      </View>
                    </TouchableHighlight>
                  )}
            ></FlatList>
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
    },
    ListItemSmall: {
        fontSize: 16,
        fontWeight: '500',
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
