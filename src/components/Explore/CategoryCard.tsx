// Source Imports
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import IconI from "react-native-vector-icons/Ionicons";
import { corgiPic } from "../../assets/imageURLs/profilePictureURLs";

export default function CategoryCard(): JSX.Element {
    return(
        <View style={[styles.card, { width: "50%", flex: 1 }]}>
            <ImageBackground source={{ uri: corgiPic }} style={{ padding: 10, margin: 10, borderRadius: 20, overflow: "hidden", backgroundColor: "blue", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{"POG"}</Text>
                <IconI name={"home"} style={{ color: "white", alignSelf: "center" }} size={70}></IconI>
                <Text style={{ color: "white", fontSize: 20, textAlign: "center", padding: 5, marginBottom: 5 }}>{"Coming Soon"}</Text>
            </ImageBackground>
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
    },
});

