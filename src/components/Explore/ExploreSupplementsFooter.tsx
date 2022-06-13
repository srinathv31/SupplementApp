// Source Imports
import React from "react";
import { View } from "react-native";
import ExploreFooterText from "./ExploreFooterText";
import ExploreSupplementCardsWindow from "./ExploreSupplementCardsWindow";

export default function ExploreSupplementsFooter({ setModalizeRefStatus, setAllOpen }: {
    setModalizeRefStatus: (m: boolean) => void,
    setAllOpen: (s: boolean) => void
}): JSX.Element {
    return(
        <View>
            <ExploreFooterText setAllOpen={setAllOpen}></ExploreFooterText>
            <ExploreSupplementCardsWindow setModalizeRefStatus={setModalizeRefStatus} />
        </View>
    );
}
