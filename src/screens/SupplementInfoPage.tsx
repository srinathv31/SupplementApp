// Source Imports
import React, { useState } from "react";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import { AppProps } from "../interfaces/Props";


export default function SupplementInfoPage(AllProps: AppProps): JSX.Element {
    const [query, setQuery] = useState<string>("");

    return(
        <>
            <SearchBar
                setQuery={setQuery}
                query={query}
            ></SearchBar>
            <SupplementListView
                {...AllProps}
                fontSizeNumber={24}
                query={query}
            ></SupplementListView>
        </>
    );
}
