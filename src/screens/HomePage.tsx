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
    const [categorySelect, setCategorySelect] = useState<"Supplement Schedule"|"Food"|"Water"|"Exercise"|"Home">("Home");

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
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                { categorySelect !== "Home" && 
                <Icon onPress={() => setCategorySelect("Home")}
                    name="arrow-back-outline" style={{ color: "white", padding: 10 }} size={30}></Icon>}
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 20, padding: 10, alignSelf: "center" }}>{categorySelect}</Text>
                </View>
            </View>
            
            { categorySelect === "Home" && 
            <><Divider length="small"></Divider>
                <CategoryBoxes setCategorySelect={setCategorySelect} supplementMap={AllProps.supplementMap} daySelected={AllProps.daySelected} />
            </>}
            { categorySelect === "Supplement Schedule"
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
