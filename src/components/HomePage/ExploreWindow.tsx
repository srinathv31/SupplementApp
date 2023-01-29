// Source Imports
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import LinearGradient from "react-native-linear-gradient";
import Divider from "../Design/Divider";
import Supplement from "../../interfaces/Supplement";
import { achievementUnlocked } from "../../utilities/handleAchievementEvents";
import analytics from "@react-native-firebase/analytics";
import { allPropsContext } from "../../contextHooks/AllPropsContext";
import useClientStore from "../../zustand/clientStore";
import shallow from "zustand/shallow";

export default function ExploreWindow({ setModalizeRefStatus, categorySelect }: {
    setModalizeRefStatus: (m: boolean) => void,
    categorySelect: "Supplement Schedule"|"Food"|"Water"|"Exercise"|"Home"
}): JSX.Element {
    const { setSelectedSupplement } = useContext(allPropsContext);

    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow); 

    const [randomSupplement, setRandomSupplement] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            grabRandomSupplement();
        }, 10000);
	
        return () => (clearInterval(interval)); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    function grabRandomSupplement(): number {
        const randomIndex = Math.floor(Math.random() * (SupplementList.length - 0) + 0);
        setRandomSupplement(randomIndex);
        return randomIndex;
    }

    function handleTouch(supp: Supplement) {
        setSelectedSupplement({ Supplement: supp, time: "", taken: "not-taken" });
        if (completedAchievements[2].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 2);
        }
        setModalizeRefStatus(true);
        exploreAnalytics(supp);
    }

    async function exploreAnalytics(supp: Supplement) {
        await analytics().logEvent("explore", {
            id: 3745092,
            item: "Explore Window",
            description: `Clicked on the explore tab for ${supp.name}`
        });
    }

    function getColors(): string[] {
        switch (categorySelect){
        case "Home":
        case "Supplement Schedule":
            return ["#ee0979", "#ff6a00"];
        case "Water":
            return ["#36D1DC", "#5B86E5"];
        }
        return ["#ee0979", "#ff6a00"];
    }

    return(
        <View style={{ flexDirection: "column", height: "25%",  margin: 10 }}>
            <TouchableOpacity onPress={() => handleTouch(SupplementList[randomSupplement])}>
                <LinearGradient colors={getColors()} style={{ justifyContent: "space-evenly", borderRadius: 10, padding: 10, alignItems: "center", height: "100%" }} >
                    <Text style={{ fontSize: 26, fontWeight: "600" }}>Explore</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>{SupplementList[randomSupplement].name}</Text>
                    <Divider length="small" color="black"></Divider>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>{SupplementList[randomSupplement].smallDescription}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>

    );
}
