// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import Divider from "../components/Design/Divider";
import CategoriesList from "../components/Explore/CategoriesList";
import ExploreHeader from "../components/Explore/ExploreHeader";
import ExploreSupplementsFooter from "../components/Explore/ExploreSupplementsFooter";
import WebModal from "../components/SlidingModals/WebModal";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import { AppProps } from "../interfaces/Props";


export default function SupplementInfoPage(AllProps: AppProps): JSX.Element {
    const [query, setQuery] = useState<string>("");
    
    const [modalizeRefStatus, setModalizeRefStatus] = useState<boolean>(false);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        if(modalizeRefStatus === true){
            onOpen();
        }
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
        <>
            <ExploreHeader></ExploreHeader>
            <SearchBar
                setQuery={setQuery}
                query={query}
            ></SearchBar>
            { query === "" ? 
                <View style={{ flex: 1 }}> 
                    <CategoriesList/>
                    <Divider length="small"></Divider>
                    <ExploreSupplementsFooter setModalizeRefStatus={setModalizeRefStatus} AllProps={AllProps} />
                </View>
                :
                <SupplementListView
                    {...AllProps}
                    fontSizeNumber={24}
                    query={query}
                ></SupplementListView>}
            <WebModal
                modalizeRef={modalizeRef}
                url={AllProps.selectedSupplement.Supplement.url}
                setModalizeRefStatus={setModalizeRefStatus}
                index={AllProps.index}
                setModalVisible={AllProps.setModalVisible}
            ></WebModal>
        </>
    );
}
