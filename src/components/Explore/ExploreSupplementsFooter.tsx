// Source Imports
import React from "react";
import { View } from "react-native";
import ExploreFooterText from "./ExploreFooterText";
import ExploreSupplementCardsWindow from "./ExploreSupplementCardsWindow";

export default function ExploreSupplementsFooter(): JSX.Element {
    return(
        <View>
            <ExploreFooterText></ExploreFooterText>
            <ExploreSupplementCardsWindow></ExploreSupplementCardsWindow>
        </View>
    );
}
