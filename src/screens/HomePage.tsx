// Source Imports
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import MoodSlider from "../components/Mood/MoodSlider";
import MoodTimelinePicker from "../components/Mood/MoodTimelinePicker";
import WebModal from "../components/SlidingModals/WebModal";
import VerifySupplementStatusModal from "../components/SupplementViews/VerifySupplementStatusModal";
import SurveyModal from "../components/WaterTracking/SurveyModal";
import WaterScreen from "../components/WaterTracking/WaterScreen";
import { allPropsContext } from "../contextHooks/AllPropsContext";
import { SupplementObject } from "../interfaces/Supplement";
import { checkUserSupplementStatus } from "../utilities/checkSupplementStatus";
import CategoryBoxes from "./../components/HomePage/CategoryBoxes";


export default function HomePage(): JSX.Element {
    const { supplementMap, daySelected, setModalVisible, selectedSupplement, index, setShowButtons } = useContext(allPropsContext);

    const [categorySelect, setCategorySelect] = useState<"Supplement Schedule"|"Food"|"Water"|"Exercise"|"Home">("Home");
    const [supplementsToUpdateStatus, setSupplementsToUpdateStatus] = useState<SupplementObject[]>([]);

    // Check if user took supplement if applicable
    useEffect(() => {
        checkUserSupplementStatus(supplementMap, daySelected, setModalVisible, setSupplementsToUpdateStatus);
    }, []);

    const modalizeRef = useRef<Modalize>(null);
    const [modalizeRefStatus, setModalizeRefStatus] = useState<boolean>(false);

    useEffect(() => {
        modalizeRefStatus === true ? onOpen() : modalizeRef.current?.close();
    }, [modalizeRefStatus]);

    useEffect(() => {
        setModalizeRefStatus(false);
    }, [index]);

    function onOpen() {
        // Removed disable-header only for home web page so status-check-modal can work
        // setModalVisible("disable-header");
        setShowButtons(false);
        modalizeRef.current?.open();
    }
    
    return(
        <View style={{ flex: 1 }}>
            <MoodSlider />
            <MoodTimelinePicker />
            <VerifySupplementStatusModal supplementsToUpdateStatus={supplementsToUpdateStatus} setSupplementsToUpdateStatus={setSupplementsToUpdateStatus}></VerifySupplementStatusModal>
            <ExploreWindow setModalizeRefStatus={setModalizeRefStatus} categorySelect={categorySelect}></ExploreWindow>
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
                <CategoryBoxes setCategorySelect={setCategorySelect} />
            </>}
            { categorySelect === "Supplement Schedule"
                    && <DailySupplementWindow />
            }
            { categorySelect === "Water"
                    && <WaterScreen />
            }
            <SurveyModal />
            <WebModal
                modalizeRef={modalizeRef}
                url={selectedSupplement.Supplement.url}
                setModalizeRefStatus={setModalizeRefStatus}
                index={index}
                setModalVisible={setModalVisible}
            ></WebModal>
        </View>
    );
}
