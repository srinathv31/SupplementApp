// Source Imports
import React, { useRef } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { exercisePic } from "../../assets/imageURLs/explorePageURLs";
import SupplementList from "../../assets/SupplementList.json";
import Icon from "react-native-vector-icons/Ionicons";
import Divider from "../Design/Divider";
import WebModal from "../SlidingModals/WebModal";
import { AppProps } from "../../interfaces/Props";
import { Modalize } from "react-native-modalize";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";

export default function ExpandedCategoryPage({ setExpand, AllProps }: {
    setExpand: (e: boolean) => void,
    AllProps: AppProps
}): JSX.Element {

    // used to open sliding modal
    const modalizeRef = useRef<Modalize>(null);
    const onOpen = () => {
        AllProps.setModalVisible({ modal: "disable-header" });
        AllProps.setShowButtons(false);
        modalizeRef.current?.open();
    };

    function jumpToWeb(item: Supplement) {
        if (AllProps.completedAchievements[2].color === "white") {
            achievementUnlocked(AllProps.completedAchievements, AllProps.setCompletedAchievements, AllProps.setModalVisible, 2);
        }
        AllProps.setSelectedSupplement({ Supplement: item, time: "", taken: "not-taken" });
        onOpen();
    }

    return(
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, maxHeight: "30%" }}>
                <TouchableOpacity onPress={() => setExpand(false)} style={{ flex: 1 }}>
                    <ImageBackground imageStyle={{ opacity: 0.5 }} source={{ uri: exercisePic }} style={{ flex: 1, padding: 10, margin: 10, borderRadius: 20, overflow: "hidden", justifyContent: "space-between" }}>
                        <Icon name="arrow-back-outline" size={50} style={{ color: "white" }}></Icon>
                        <Text style={styles.cardText}>{"Exercise"}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <Text style={styles.cardBio}>{"These supplements may affect performance in athletic activities."}</Text>
            <Divider length="small"></Divider>
            <View style={{ alignSelf: "center", flex: 1, marginVertical: 5 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={
                            SupplementList.filter(post => {
                                if (post.categories.includes("Exercise")) {
                                    return post;
                                }
                            })
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.name}
                                onPress={() => jumpToWeb(item)}
                            >
                                <View>
                                    <Text style={styles.ListItem}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    ></FlatList>
                </View>
            </View>
            <WebModal
                modalizeRef={modalizeRef}
                url={AllProps.selectedSupplement.Supplement.url}
                index={AllProps.index}
                setModalVisible={AllProps.setModalVisible}
            ></WebModal>
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
        fontSize: 35,
        textAlign: "left",
        padding: 5,
        marginBottom: 5,
        fontWeight: "600",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    cardBio: {
        color: "white",
        fontSize: 20,
        fontStyle: "italic",
        textAlign: "center",
        padding: 15,
        marginBottom: 5,
        fontWeight: "300",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
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
        width: 200
    },
});
