// Source Imports
import React from "react";
import { View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import ExploreFooterText from "./ExploreFooterText";
import ExploreSupplementCardsWindow from "./ExploreSupplementCardsWindow";

export default function ExploreSupplementsFooter({ setModalizeRefStatus, AllProps, setAllOpen }: {
    setModalizeRefStatus: (m: boolean) => void,
    AllProps: AppProps
    setAllOpen: (s: boolean) => void
}): JSX.Element {
    return(
        <View>
            <ExploreFooterText setAllOpen={setAllOpen}></ExploreFooterText>
            <ExploreSupplementCardsWindow setModalizeRefStatus={setModalizeRefStatus} AllProps={AllProps}/>
        </View>
    );
}
