// Source Imports
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";

export default function ExploreSupplementCard({ supplementData, setModalizeRefStatus }: {
    supplementData: Supplement,
    setModalizeRefStatus: (m: boolean) => void,
}): JSX.Element {
    const { setSelectedSupplement, setCompletedAchievements, completedAchievements, setModalVisible } = useContext(allPropsContext);

    const longSupplementNames = ["N-Acetylcysteine", "Scutellaria baicalensis", "Ashwagandha", "Rhodiola Rosea"];

    function handleWebOpen() {
        setSelectedSupplement({ Supplement: supplementData, time: "", taken: "not-taken" });
        if (completedAchievements[2].color === "white") {
            achievementUnlocked(completedAchievements, setCompletedAchievements, setModalVisible, 2);
        }
        setModalizeRefStatus(true);
    }

    return(
        <View>
            <TouchableOpacity onPress={() => handleWebOpen()}>
                <View>
                    <Text style={[styles.ListItem, { fontSize: longSupplementNames.includes(supplementData.name) ? 18 : 24 }]}>{supplementData.name}</Text>
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
