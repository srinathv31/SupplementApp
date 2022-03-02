// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import MoodSlider from "../components/Mood/MoodSlider";
import MoodTimelinePicker from "../components/Mood/MoodTimelinePicker";
import WebModal from "../components/SlidingModals/WebModal";
import { MoodTimelinePickerProps } from "../interfaces/MoodTimelineProps";
import { AppProps } from "../interfaces/Props";
import CategoryBoxes from "./../components/HomePage/CategoryBoxes";


export default function HomePage(AllProps: AppProps): JSX.Element {
    const [categorySelect, setCategorySelect] = useState<"supplement"|"food"|"water"|"exercise"|"home">("home");

    const MoodTimelineProps: MoodTimelinePickerProps = {
        daySelected: AllProps.daySelected,
        setModalVisible: AllProps.setModalVisible,
        modalVisible: AllProps.modalVisible,
        setSupplementMap: AllProps.setSupplementMap,
        supplementMap: AllProps.supplementMap,
        completedAchievements: AllProps.completedAchievements,
        setCompletedAchievements: AllProps.setCompletedAchievements
    };

    const modalizeRef = useRef<Modalize>(null);
    const [modalizeRefStatus, setModalizeRefStatus] = useState<boolean>(false);


    useEffect(() => {
        modalizeRefStatus === true ? onOpen() : modalizeRef.current?.close();
    }, [modalizeRefStatus]);

    useEffect(() => {
        setModalizeRefStatus(false);
    }, [AllProps.index]);

    function onOpen() {
        AllProps.setModalVisible({ modal: "disable-header" });
        AllProps.setShowButtons(false);
        modalizeRef.current?.open();
    }
    
    return(
        <View style={{ flex: 1 }}>
            <MoodSlider {...AllProps}></MoodSlider>
            <MoodTimelinePicker {...MoodTimelineProps} />
            <ExploreWindow
                setModalizeRefStatus={setModalizeRefStatus}
                {...AllProps}
            ></ExploreWindow>
            <Divider length="full"></Divider>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                { categorySelect !== "home" && <Icon onPress={() => setCategorySelect("home")}
                    name="expand" style={{ color: "white", padding: 10, justifyContent: "flex-start" }} size={30}></Icon>}
                <Text style={{ color: "white", fontSize: 20 }}>{categorySelect}</Text>
            </View>
            { categorySelect === "home" && <CategoryBoxes setCategorySelect={setCategorySelect} />}
            { categorySelect === "supplement"
                    && <DailySupplementWindow
                        {...AllProps}
                    ></DailySupplementWindow>
            }
            <WebModal
                modalizeRef={modalizeRef}
                url={AllProps.selectedSupplement.Supplement.url}
                setModalizeRefStatus={setModalizeRefStatus}
                index={AllProps.index}
                setModalVisible={AllProps.setModalVisible}
            ></WebModal>
        </View>
    );
}
