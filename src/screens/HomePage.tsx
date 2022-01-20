// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import MoodSlider from "../components/Mood/MoodSlider";
import WebModal from "../components/SlidingModals/WebModal";
import DetailedSupplementModal from "../components/SupplementViews/DetailedSupplementModal";
import { AppProps } from "../interfaces/Props";


export default function HomePage(AllProps: AppProps): JSX.Element {

    const modalizeRef = useRef<Modalize>(null);
    const [modalizeRefStatus, setModalizeRefStatus] = useState<boolean>(false);


    useEffect(() => {
        modalizeRefStatus === true ? modalizeRef.current?.open() : modalizeRef.current?.close();
    }, [modalizeRefStatus]);

    useEffect(() => {
        setModalizeRefStatus(false);
    }, [AllProps.index]);

    
    return(
        <View>
            <DetailedSupplementModal
                {...AllProps}
            ></DetailedSupplementModal>
            <MoodSlider {...AllProps}></MoodSlider>
            <ExploreWindow
                setModalizeRefStatus={setModalizeRefStatus}
                {...AllProps}
            ></ExploreWindow>
            <Divider length="full"></Divider>
            <DailySupplementWindow
                {...AllProps}
            ></DailySupplementWindow>
            <WebModal
                modalizeRef={modalizeRef}
                url={AllProps.selectedSupplement.Supplement.url}
                modalHeight={925}
                setModalizeRefStatus={setModalizeRefStatus}
            ></WebModal>
        </View>
    );
}
