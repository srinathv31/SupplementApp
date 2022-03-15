// Source Imports
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ExploreSupplementCard from "./ExploreSupplementCard";
import SupplementList from "../../assets/SupplementList.json";

export default function ExploreSupplementCardsWindow(): JSX.Element {
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
                        <ExploreSupplementCard supplementData={SupplementList[randomSupplementList[0]]} />
                        <ExploreSupplementCard supplementData={SupplementList[randomSupplementList[1]]} />
                    </View>
                    <View>
                        <ExploreSupplementCard supplementData={SupplementList[randomSupplementList[2]]} />
                        <ExploreSupplementCard supplementData={SupplementList[randomSupplementList[3]]} />
                    </View>
                </View>
            </ScrollView>
            
        </>
    );
}
