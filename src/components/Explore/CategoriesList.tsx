// Source Imports
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { anxietySleepPic, boneJointPic, brainPic, exercisePic, generalHealthPic } from "../../assets/imageURLs/explorePageURLs";
import { Category } from "../../interfaces/Categories";
import CategoryCard from "./CategoryCard";

export default function CategoriesList({ setExpand }: {
    setExpand: (e: "none" | "Exercise" | "General Health" | "Brain Health" | "Bone and Joint" | "Anxiety/Sleep") => void
}): JSX.Element {

    const categories: Category[] = [
        { name: "Exercise", picture: exercisePic },
        { name: "General Health", picture: generalHealthPic },
        { name: "Brain Health", picture: brainPic },
        { name: "Bone and Joint", picture: boneJointPic },
        { name: "Anxiety/Sleep", picture: anxietySleepPic }
    ];

    return(
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                {categories.map((item, index) => {
                    return (
                        <CategoryCard key={index} category={item} setExpand={setExpand}></CategoryCard>
                    );
                })}
            </View>
        </ScrollView>
    );
}
