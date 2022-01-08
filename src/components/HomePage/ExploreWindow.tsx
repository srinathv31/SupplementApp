// Source Imports
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import LinearGradient from "react-native-linear-gradient";
import Divider from "../Design/Divider";
import Supplement from "../../interfaces/Supplement";
import { AppProps } from "../../interfaces/Props";


export default function ExploreWindow({ setSelectedSupplement, setModalVisible }: AppProps): JSX.Element {
    const [randomSupplement, setRandomSupplement] = useState<number>(0);
    // const [randomGradient, setRandomGradient] = useState<number>(0);

    // const colors = [["#0016e4", "#ccb5e8"], ["#ee0979", "#ff6a00"], ["#004FF9", "#FFF94C"]];

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
    // function grabRandomGradient() {
    // 	const randomIndex = Math.floor(Math.random() * (colors.length - 0) + 0);
    // 	setRandomGradient(randomIndex);
    // }

    function handleTouch(supp: Supplement) {
        setSelectedSupplement({ Supplement: supp, time: "", taken: "not-taken" });
        setModalVisible({ modal: "info-modal" });
    }

    return(
        <View style={{ flexDirection: "column", height: "20%",  margin: 10 }}>
            <TouchableOpacity onPress={() => handleTouch(SupplementList[randomSupplement])}>
                <LinearGradient colors={["#ee0979", "#ff6a00"]} style={{ justifyContent: "space-evenly", borderRadius: 10, padding: 10, alignItems: "center", height: "100%" }} >
                    <Text style={{ fontSize: 26, fontWeight: "600" }}>Explore</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>{SupplementList[randomSupplement].name}</Text>
                    <Divider length="small" color="black"></Divider>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>{SupplementList[randomSupplement].smallDescription}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>

    );
}
