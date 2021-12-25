// Source Imports
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Supplement from "../../interfaces/Supplement";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Component Imports

// Design Imports

export default function DailySupplementWindow({ setSupplementMap, supplementMap, daySelected }: {
    setSupplementMap: (d: Record<string, Supplement[]>) => void, supplementMap: Record<string, Supplement[]>,
    daySelected: string
}): JSX.Element {

    function removeSupplement(item: Supplement) {
        let supplementMapCopy = {...supplementMap};

        supplementMapCopy[daySelected] = supplementMapCopy[daySelected].filter(listItem => listItem !== item);
        setSupplementMap(supplementMapCopy);
    }

    return(
        // <>
        //     <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 10, marginBottom: 5, marginLeft: 25, marginRight: 25}}>
        //         <Text style={{fontSize: 18, fontWeight: "600"}}>7:00AM: Recommended Supplement</Text>
        //     </View>
        //     <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "orange", height: "10%", borderRadius: 10, padding: 10, margin: 5, marginLeft: 25, marginRight: 25}}>
        //         <Text style={{fontSize: 18, fontWeight: "600"}}>10:00AM: Recommended Supplement</Text>
        //     </View>
        // </>
        <View style={{alignSelf: "center"}}>
            <FlatList
                data={supplementMap[daySelected]}
                renderItem={({ item }) => (
                    <TouchableHighlight
                      key={item.name}
                      
                      >
                      <View style={styles.ListItem}>
                        <Text style={styles.ListName}>{item.time}: {item.name}</Text>
                        <Icon onPress={() => removeSupplement(item)}
                            name="delete-forever" style={styles.IconPadding}/>
                      </View>
                    </TouchableHighlight>
                  )}
            ></FlatList>
        </View>
    );
}


const styles = StyleSheet.create({
    ListItem: {
        textAlign: "center",
        padding: 10,
        margin: 10,
        color: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "orange",
        overflow:"hidden",
        flexDirection: "row"
    },
    ListName: {
        fontSize: 18,
        fontWeight: '600',
    },
    IconPadding: {
        padding: 1,
        margin: 1,
        fontSize: 18
    }
});
