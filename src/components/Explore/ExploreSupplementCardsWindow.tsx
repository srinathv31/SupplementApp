// Source Imports
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ExploreSupplementCard from "./ExploreSupplementCard";
import SupplementList from "../../assets/SupplementList.json";
import { AppProps } from "../../interfaces/Props";

export default function ExploreSupplementCardsWindow({ setModalizeRefStatus, AllProps }: {
    setModalizeRefStatus: (m: boolean) => void,
    AllProps: AppProps
}): JSX.Element {
    const [randomSupplementList, setRandomSupplementList] = useState<number[]>([0,1,2,3]);

    useEffect(() => {
        const randomSupplementListCopy: number[] = [];
        for (let i=0; i<4; i++){
            let index = grabRandomSupplement();
            if (randomSupplementListCopy.includes(index)){
                index++;
            }
            randomSupplementListCopy.push(index);
        }
        setRandomSupplementList(randomSupplementListCopy);
    }, []);

    function grabRandomSupplement(): number {
        const randomIndex = Math.floor(Math.random() * (SupplementList.length - 0) + 0);
        return randomIndex;
    }

    return(
        <>
            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <View>
                        <ExploreSupplementCard setModalizeRefStatus={setModalizeRefStatus} supplementData={SupplementList[randomSupplementList[0]]} AllProps={AllProps} />
                        <ExploreSupplementCard setModalizeRefStatus={setModalizeRefStatus} supplementData={SupplementList[randomSupplementList[1]]} AllProps={AllProps} />
                    </View>
                    <View>
                        <ExploreSupplementCard setModalizeRefStatus={setModalizeRefStatus} supplementData={SupplementList[randomSupplementList[2]]} AllProps={AllProps} />
                        <ExploreSupplementCard setModalizeRefStatus={setModalizeRefStatus} supplementData={SupplementList[randomSupplementList[3]]} AllProps={AllProps} />
                    </View>
                </View>
            </ScrollView>
            
        </>
    );
}
