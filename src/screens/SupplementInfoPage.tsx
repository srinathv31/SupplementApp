// Source Imports
import React, { useState } from "react";
import { View } from "react-native";
import CategoriesList from "../components/Explore/CategoriesList";
import ExploreHeader from "../components/Explore/ExploreHeader";
import ExploreSupplementsFooter from "../components/Explore/ExploreSupplementsFooter";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import { AppProps } from "../interfaces/Props";


export default function SupplementInfoPage(AllProps: AppProps): JSX.Element {
    const [query, setQuery] = useState<string>("");

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
                    <ExploreSupplementsFooter />
                </View>
                :
                <SupplementListView
                    {...AllProps}
                    fontSizeNumber={24}
                    query={query}
                ></SupplementListView>}
        </>
    );
}
