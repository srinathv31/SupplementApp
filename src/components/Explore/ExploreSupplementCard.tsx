// Source Imports
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";

export default function ExploreSupplementCard({ supplementData, setModalizeRefStatus, AllProps }: {
    supplementData: Supplement,
    setModalizeRefStatus: (m: boolean) => void,
    AllProps: AppProps
}): JSX.Element {

    function handleWebOpen() {
        AllProps.setSelectedSupplement({ Supplement: supplementData, time: "", taken: "not-taken" });
        if (AllProps.completedAchievements[2].color === "white") {
            achievementUnlocked(AllProps.completedAchievements, AllProps.setCompletedAchievements, AllProps.setModalVisible, 2);
        }
        setModalizeRefStatus(true);
    }

    return(
        <View>
            <TouchableOpacity onPress={() => handleWebOpen()}>
                <View>
                    <Text style={styles.ListItem}>{supplementData.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    ListItem: {
        fontSize: 24,
        textAlign: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#112442",
        overflow:"hidden",
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "white",
        width: 160,
    },
});
