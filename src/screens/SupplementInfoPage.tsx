// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import Divider from "../components/Design/Divider";
import AllSupplementsHeader from "../components/Explore/AllSupplementsHeader";
import CategoriesList from "../components/Explore/CategoriesList";
import ExploreHeader from "../components/Explore/ExploreHeader";
import ExploreSupplementsFooter from "../components/Explore/ExploreSupplementsFooter";
import WebModal from "../components/SlidingModals/WebModal";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import { AppProps } from "../interfaces/Props";


export default function SupplementInfoPage(AllProps: AppProps): JSX.Element {
    const [query, setQuery] = useState<string>("");
    const [allOpen, setAllOpen] = useState<boolean>(false);

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
            { allOpen === false ? <ExploreHeader></ExploreHeader> : <AllSupplementsHeader setAllOpen={setAllOpen} />}
            <SearchBar
                setQuery={setQuery}
                query={query}
            ></SearchBar>
            { query === "" && allOpen === false ? 
                <View style={{ flex: 1 }}> 
                    <CategoriesList/>
                    <Divider length="small"></Divider>
                    <ExploreSupplementsFooter setModalizeRefStatus={setModalizeRefStatus} AllProps={AllProps} setAllOpen={setAllOpen} />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <SupplementListView
                        {...AllProps}
                        fontSizeNumber={24}
                        query={query}
                    ></SupplementListView>
                </View>}
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
