// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";
import IconI from "react-native-vector-icons/MaterialCommunityIcons";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import WebModal from "../components/SlidingModals/WebModal";
import VerifySupplementStatusModal from "../components/SupplementViews/VerifySupplementStatusModal";
import SurveyModal from "../components/WaterTracking/SurveyModal";
import WaterScreen from "../components/WaterTracking/WaterScreen";
import { PageCategory } from "../interfaces/AppTypes";
import { SupplementObject } from "../interfaces/Supplement";
import { checkUserSupplementStatus } from "../utilities/checkSupplementStatus";
import useClientStore from "../zustand/clientStore";
import CategoryBoxes from "./../components/HomePage/CategoryBoxes";
import MoodScreen from "./MoodScreen";


export default function HomePage(): JSX.Element {
    const supplementMap = useClientStore(state => state.supplementMap);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const updateShowButtons = useClientStore(state => state.updateShowButtons);
    const index = useClientStore(state => state.index);
    const daySelected = useClientStore(state => state.daySelected);
    const selectedSupplement = useClientStore(state => state.selectedSupplement);
    const updateMultipleAddMode = useClientStore(state => state.updateMultipleAddMode);

    const [categorySelect, setCategorySelect] = useState<PageCategory>("Home");
    const [supplementsToUpdateStatus, setSupplementsToUpdateStatus] = useState<SupplementObject[]>([]);

    // Check if user took supplement if applicable
    useEffect(() => {
        checkUserSupplementStatus(supplementMap, daySelected, updateModalVisible, setSupplementsToUpdateStatus);
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
        // updateModalVisible("disable-header");
        updateShowButtons(false);
        modalizeRef.current?.open();
    }
    
    return(
        <View style={{ flex: 1 }}>
            <VerifySupplementStatusModal supplementsToUpdateStatus={supplementsToUpdateStatus} setSupplementsToUpdateStatus={setSupplementsToUpdateStatus}></VerifySupplementStatusModal>
            <ExploreWindow setModalizeRefStatus={setModalizeRefStatus} categorySelect={categorySelect}></ExploreWindow>
            <Divider length="full"></Divider>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", position: "relative" }}>
                { categorySelect !== "Home" && 
                <Icon onPress={() => setCategorySelect("Home")}
                    name="arrow-back-outline" style={{ color: "white", padding: 8, alignSelf: "flex-start", position: "absolute", left: 0 }} size={30}></Icon>
                }
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 20, padding: 10, alignSelf: "center" }}>{categorySelect}</Text>
                </View>
                { categorySelect !== "Home" && 
                <IconI onPress={() => (updateModalVisible("supplement-modal"), updateMultipleAddMode(true))} 
                    name="clock" size={30} color="white" style={{ color: "white", padding: 8, alignSelf: "flex-start", position: "absolute", right: "3%" }}/>
                }
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
            { categorySelect === "Mood"
                    && <MoodScreen />
            }
            <SurveyModal />
            <WebModal
                modalizeRef={modalizeRef}
                url={selectedSupplement.Supplement.url}
                setModalizeRefStatus={setModalizeRefStatus}
                index={index}
            ></WebModal>
        </View>
    );
}
