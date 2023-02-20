// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import IconI from "react-native-vector-icons/MaterialCommunityIcons";
import Divider from "../components/Design/Divider";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import WebModal from "../components/SlidingModals/WebModal";
import VerifySupplementStatusModal from "../components/SupplementViews/VerifySupplementStatusModal";
import WaterScreen from "../components/WaterTracking/WaterScreen";
import { SupplementObject } from "../interfaces/Supplement";
import { checkUserSupplementStatus } from "../utilities/checkSupplementStatus";
import { clearMoods } from "../utilities/moodFunction";
import { sharePlan } from "../utilities/shareFunctions";
import useClientStore from "../zustand/clientStore";
import CategoryBoxes from "./../components/HomePage/CategoryBoxes";
import MoodScreen from "./MoodScreen";
import DailySupplementsList from "../components/SupplementViews/DailySupplementList";
import { PageCategory } from "../interfaces/AppTypes";

export default function HomePage(): JSX.Element {
    const userData = useClientStore(state => state.userData);
    const updateUserData = useClientStore(state => state.updateUserData);
    const updateSupplementMap = useClientStore(state => state.updateSupplementMap);
    const supplementMap = useClientStore(state => state.supplementMap);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const index = useClientStore(state => state.index);
    const daySelected = useClientStore(state => state.daySelected);
    const selectedSupplement = useClientStore(state => state.selectedSupplement);
    const updateMultipleAddMode = useClientStore(state => state.updateMultipleAddMode);
    const objDaySelected = useClientStore(state => state.objDaySelected);
    const categorySelect = useClientStore(state => state.categorySelect);

    const [supplementsToUpdateStatus, setSupplementsToUpdateStatus] = useState<SupplementObject[]>([]);

    // Check if user took supplement if applicable
    useEffect(() => {
        checkUserSupplementStatus(supplementMap, daySelected, updateModalVisible, setSupplementsToUpdateStatus);
    }, []);

    const modalizeRef = useRef<Modalize>(null);
    const [modalizeRefStatus, setModalizeRefStatus] = useState<boolean>(false);

    useEffect(() => {
        modalizeRefStatus === true 
            ? (onOpen(), updateModalVisible("disable-header")) 
            : (modalizeRef.current?.close(), updateModalVisible("hide-modal"));
    }, [modalizeRefStatus]);

    useEffect(() => {
        setModalizeRefStatus(false);
    }, [index]);

    function onOpen() {
        // Removed disable-header only for home web page so status-check-modal can work
        // updateModalVisible("disable-header");
        modalizeRef.current?.open();
    }
    
    const pageMap: Record<PageCategory, JSX.Element> = {
        "Home": <CategoryBoxes />,
        "Supplement Schedule": <DailySupplementsList />,
        "Mood": <MoodScreen />,
        "Water": <WaterScreen />,
        "Exercise": <CategoryBoxes />
    };

    return(
        <View style={{ flex: 1 }}>
            <VerifySupplementStatusModal supplementsToUpdateStatus={supplementsToUpdateStatus} setSupplementsToUpdateStatus={setSupplementsToUpdateStatus}></VerifySupplementStatusModal>
            <ExploreWindow setModalizeRefStatus={setModalizeRefStatus} categorySelect={categorySelect}></ExploreWindow>
            <Divider length="full"></Divider>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", position: "relative" }}>
                { categorySelect === "Supplement Schedule" && 
                <Icon onPress={() => sharePlan(supplementMap, daySelected)}
                    name="share-outline" size={30} color="white" style={{ padding: 8, alignSelf: "flex-start", position: "absolute", left: "3%" }}/>
                }
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 20, padding: 10, alignSelf: "center" }}>{categorySelect}</Text>
                </View>
                { categorySelect === "Supplement Schedule" && 
                <IconI onPress={() => (updateModalVisible("supplement-modal"), updateMultipleAddMode(true))} 
                    name="clock" size={30} color="white" style={{ padding: 8, alignSelf: "flex-start", position: "absolute", right: "3%" }}/>
                }
                { categorySelect === "Mood" && 
                <IconI onPress={() => clearMoods({ userData, supplementMap, daySelected, updateUserData, updateSupplementMap, updateModalVisible, objDaySelected })} 
                    name="cancel" size={30} color="red" style={{ padding: 8, alignSelf: "flex-start", position: "absolute", right: "3%" }}/>
                }
            </View>
            {pageMap[categorySelect]}
            <WebModal
                modalizeRef={modalizeRef}
                url={selectedSupplement.Supplement.url}
                setModalizeRefStatus={setModalizeRefStatus}
                index={index}
            ></WebModal>
        </View>
    );
}
