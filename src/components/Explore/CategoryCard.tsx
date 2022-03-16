// Source Imports
import React from "react";
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Category } from "../../interfaces/Categories";

export default function CategoryCard({ category, setExpand }: {
    category: Category,
    setExpand: (e: "none" | "Exercise" | "General Health" | "Brain Health" | "Bone and Joint" | "Anxiety/Sleep") => void
}): JSX.Element {
    return(
        <View style={[styles.card, { flex: 1, width: 200 }]}>
            <TouchableOpacity onPress={() => setExpand(category.name)} style={{ flex: 1 }}>
                <ImageBackground source={{ uri: category.picture }} style={{ flex: 1, padding: 10, margin: 10, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end" }}>
                    <Text style={styles.cardText}>{""}</Text>
                    <Text style={styles.cardText}>{category.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        marginVertical: 5
    },
    cardText: {
        color: "white",
        fontSize: 23,
        textAlign: "left",
        padding: 5,
        marginBottom: 5,
        fontWeight: "600"
    }
});
