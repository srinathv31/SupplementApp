// Source Imports
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { penguinPic } from "../assets/imageURLs/profilePictureURLs";
import { AppProps } from "../interfaces/Props";

export default function OnboardingTour({ setPage }: {
    setPage: AppProps["setPage"]
}): JSX.Element {
    return(
        <Onboarding
            onDone={() => setPage({ page: "loading-screen" })}
            controlStatusBar={false}
            showSkip={false}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <Image source={{ uri: penguinPic }} style={{ height: 100, width: 100 }} />,
                    title: "Welcome to Your New Supplement & Lifestyle Planner",
                    subtitle: "We're excited for you to start your better health journey ❤️",
                },
                {
                    backgroundColor: "#fe6e58",
                    image: <Image source={{ uri: penguinPic }} style={{ height: 100, width: 100 }} />,
                    title: "Start by Scheduling a Supplement 💪",
                    subtitle: "This is the subtitle that sumplements the title.",
                },
                {
                    backgroundColor: "skyblue",
                    image: <Image source={{ uri: penguinPic }} style={{ height: 100, width: 100 }} />,
                    title: "Get Information on New Supplements 🔍",
                    subtitle: "Beautiful, isn't it?",
                },
            ]}
        />
    );
}
