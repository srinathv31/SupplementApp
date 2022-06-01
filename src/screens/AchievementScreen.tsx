// Source Imports
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Divider from "../components/Design/Divider";
import Icon from "react-native-vector-icons/Ionicons";
import AchievementsList from "../components/Achievements/AchievementsList";
import ScoreCard from "../components/Achievements/ScoreCard";
import CustomToast from "../components/Toast/customToast";
import { allPropsContext } from "../contextHooks/AllPropsContext";

export default function AchievementScreen(): JSX.Element {
    const { setModalVisible, modalVisible, userData } = useContext(allPropsContext);

    const [numberOfAchievements, setNumberOfAchievements] = useState<number>(0);

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.modal === "achievements-modal" ? true : false}
            onRequestClose={() => {
                setModalVisible({ modal: "hide-modal" });
            }}
            style={{ flex: 1 }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: 5, flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Icon
                                style={{ padding: 5, margin: 0 }}
                                onPress={() => setModalVisible({ modal: "hide-modal" })}
                                name="close-outline" size={30} color="white"
                            />
                        </View>
                        <Text style={{ color: "white", fontSize: 28, textAlign: "center", padding: 10, paddingBottom: 0 }}>{`${userData.name}'s Achievements`}</Text>
                        <ScoreCard numberOfAchievements={numberOfAchievements} />
                        <Divider length="small"></Divider>
                        <AchievementsList  setNumberOfAchievements={setNumberOfAchievements} numberOfAchievements={numberOfAchievements} />
                    </View>
                </View>
            </View>
            <CustomToast />
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    modalView: {
        width: "100%", padding: 10,
        height: "95%",
        backgroundColor: "#0B172A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        overflow: "hidden"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 125,
        alignSelf: "center",
        marginTop: "0%"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
