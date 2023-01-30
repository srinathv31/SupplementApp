// Source Imports
import React from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { addBatchPic, addButtonPic, calendarPic, dailyPic, feedbackGIF, introPic, LogoPic, moodPic, researchPic, sharePic } from "../assets/imageURLs/onboardingURLs";
import Video from "react-native-video";
import useClientStore from "../zustand/clientStore";

export default function OnboardingTour(): JSX.Element {
    const updatePage = useClientStore(state => state.updatePage);

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <Onboarding
                onDone={() => updatePage("loading-screen")}
                controlStatusBar={false}
                showSkip={false}
                pages={[
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: introPic }} style={{ height: 300, width: 300 }} />,
                        title: "Welcome to Your New Supplement & Lifestyle Planner",
                        subtitle: "We're excited for you to start your better health journey ❤️",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: addButtonPic }} style={{ height: 200, width: 375 }} />,
                        title: "Start by Scheduling a Supplement 💪",
                        subtitle: "It's as easy as clicking this button and then choosing a supplement.",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: addBatchPic }} style={{ height: 200, width: 375 }} />,
                        title: "Or Schedule a Bunch of Supplements at Once",
                        subtitle: "You can select all the days you want to add a supplement to. Just to make scheduling easier 😉",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: researchPic }} style={{ height: 215, width: 375 }} />,
                        title: "Start your Research on Supplements Now",
                        subtitle: "Tap any Supplement Card to Get Up-To-Date Research, Recomended Dosage, and more 🔍",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: dailyPic }} style={{ height: 200, width: 375 }} />,
                        title: "Get Specific as You Want",
                        subtitle: "Tap a Supplement Card in your schedule to get a detailed breakdown.",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: moodPic }} style={{ height: 200, width: 375 }} />,
                        title: "Track your Mood 😄",
                        subtitle: "Follow your mental health trends.",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: calendarPic }} style={{ height: 300, width: 310 }} />,
                        title: "Track your Days on the Calendar and in a Daily Journal 📆",
                        subtitle: "On the Calendar Page, an Orange Dot 🟠 indicates a Supplement and a Green Dot 🟢 indicates a Journal Entry.",
                    
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: sharePic }} style={{ height: 200, width: 375 }} />,
                        title: "Share a New Supplement You Found or Your Daily Schedule ✈️",
                        subtitle: "The share button will automatically appear on pages you can share on 🪄.",
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: 
                    <Video 
                        source={{ uri: feedbackGIF }}   // Can be a URL or a local file.
                        paused={false}
                        repeat={true}
                        muted={false}
                        style={styles.backgroundVideo} 
                    />,
                        title: "Screenshot to Send Feedback Directly to the Dev Team ✅",
                        subtitle: "",
                        titleStyles: { color: "white", position: "absolute", bottom: 325, left: "-45%" }
                    },
                    {
                        backgroundColor: "#0B172A",
                        image: <Image source={{ uri: LogoPic }} style={{ height: 200, width: 375 }} />,
                        title: "Now Let's Go Build a Healthier Lifestyle 😉",
                        subtitle: "",
                    },
                ]}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: -250,
        left: 0,
        bottom: 0,
        right: 0,
        height: 600
    },
});
