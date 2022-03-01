// Source Imports
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AchievementsList({ setNumberOfAchievements }: {
    setNumberOfAchievements: (a: number) => void
}): JSX.Element {

    const AchievementsList = [
        { name: "First Supplement 😄", description: "Scheduled your first supplement.", color: "white" },
        { name: "Journalist 📓", description: "Started your first journal entry.", color: "white" },
        { name: "Researcher 🧐", description: "Read info about 1 supplement.", color: "white" },
        { name: "Planner 📆", description: "Created a schedule for a supplement.", color: "white" },
        { name: "How Does this Thing Work? 🤔", description: "Clicked on the help button.", color: "white" },
        { name: "New Pic, New Me 📸", description: "Change your profile picture.", color: "skyblue" },
        { name: "That's Not My Name! 🎸", description: "Change your name.", color: "white" },
        { name: "What's this? 🔍", description: "Open the Achievements page.", color: "skyblue" },
        { name: "Clean Slate 🧹", description: "Erase your entire plan.", color: "skyblue" },
        { name: "\"I'm Something of a Scientist Myself\" 🕷️", description: "Create a note for an individual supplement.", color: "white" },
        { name: "Observant 📖", description: "Track a mood.", color: "white" },
        { name: "Night Owl 🦉", description: "Login between 1AM and 4AM", color: "white" },
        { name: "Early Bird ☀️", description: "Login between 4AM and 7AM", color: "white" },
        { name: "Time is Money 🕰️", description: "Schedule a time for a supplement", color: "white" },
        { name: "Analyzer 📈", description: "Analyze your data.", color: "white" }
    ];

    useEffect(() => {
        let count = 0;
        Object.values(AchievementsList).forEach(item => {
            if(item.color === "skyblue"){
                count++;
            }
        });
        setNumberOfAchievements(count);
    }, []);

    return(
        <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            {AchievementsList.map((item, index) => {
                return(
                    <View key={index} style={{ backgroundColor: "#112442", padding: 10, margin: 5, borderRadius: 5, width: "97%", borderWidth: item.color === "skyblue" ? 1 : 0, borderColor: item.color === "skyblue" ? "skyblue" : "transparent" }}>
                        <Text
                            style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>
                            {item.name}
                        </Text>
                        { item.color === "skyblue" && <Text
                            style={{ color: item.color, fontSize: 15, textAlign: "left", padding: 5, marginBottom: 5 }}>
                            {item.description}
                        </Text>}
                    </View>
                );
            })}
        </ScrollView>
    );
}
