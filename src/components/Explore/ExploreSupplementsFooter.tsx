// Source Imports
import React from "react";
import { View } from "react-native";
import { AppProps } from "../../interfaces/Props";
import ExploreFooterText from "./ExploreFooterText";
import ExploreSupplementCardsWindow from "./ExploreSupplementCardsWindow";

export default function ExploreSupplementsFooter({ setModalizeRefStatus, AllProps }: {
    setModalizeRefStatus: (m: boolean) => void,
    AllProps: AppProps
}): JSX.Element {
    return(
        <View>
            <ExploreFooterText></ExploreFooterText>
            <ExploreSupplementCardsWindow setModalizeRefStatus={setModalizeRefStatus} AllProps={AllProps}/>
        </View>
    );
}
