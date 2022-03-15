// Source Imports
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategoryCard from "./CategoryCard";

export default function CategoriesList(): JSX.Element {
    return(
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
                <CategoryCard></CategoryCard>
            </View>
        </ScrollView>
    );
}
