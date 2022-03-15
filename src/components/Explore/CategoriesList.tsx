// Source Imports
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { allergiesPic, brainPic, exercisePic, generalHealthPic } from "../../assets/imageURLs/explorePageURLs";
import { Category } from "../../interfaces/Categories";
import CategoryCard from "./CategoryCard";

export default function CategoriesList(): JSX.Element {

    const categories: Category[] = [
        { name: "Exercise", picture: exercisePic, icon: "home" },
        { name: "General Health", picture: generalHealthPic, icon: "home" },
        { name: "Brain Health", picture: brainPic, icon: "home" },
        { name: "Allergies", picture: allergiesPic, icon: "home" }
    ];

    return(
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                {categories.map((item, index) => {
                    return (
                        <CategoryCard key={index} category={item}></CategoryCard>
                    );
                })}
            </View>
        </ScrollView>
    );
}
