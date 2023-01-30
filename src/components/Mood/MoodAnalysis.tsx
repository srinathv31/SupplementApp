// Source Imports
// import { BottomTabBar } from "./BottomTabBar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import MoodBarGraph from "./MoodBarGraph";
import useClientStore from "../../zustand/clientStore";

export default function MoodAnalysis(): JSX.Element {
    const updateShowButtons = useClientStore(state => state.updateShowButtons);
    const index = useClientStore(state => state.index);
    const week = useClientStore(state => state.week);

    // const [graphType, setGraphType] = useState<string>("data0");
    // const [tabSelect, setTabSelect] = useState<"weekly" | "daily" | "monthly">("weekly");

    useEffect(() => {
        if (index === 3) {
            updateShowButtons(false);
        }
    }, [index]);

    return(
        <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.modalText}>{week[0].dateString+""} - {week[6].dateString+""}</Text>
            {/* <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                <MoodBarGraph graphType={graphType} />
                <BottomTabBar setTabSelect={setTabSelect} setGraphType={setGraphType} tabSelect={tabSelect}  />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    modalText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: "center"
    }
});
