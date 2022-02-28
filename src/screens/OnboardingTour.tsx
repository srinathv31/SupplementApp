// Source Imports
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
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
                    image: <Image source={require("../assets/images/husky.jpg")} style={{ height: 100, width: 100 }} />,
                    title: "Onboarding",
                    subtitle: "Done with React Native Onboarding Swiper",
                },
                {
                    backgroundColor: "#fe6e58",
                    image: <Image source={require("../assets/images/pitbull.jpg")} style={{ height: 100, width: 100 }} />,
                    title: "The Title",
                    subtitle: "This is the subtitle that sumplements the title.",
                },
                {
                    backgroundColor: "skyblue",
                    image: <Image source={require("../assets/images/trippy_astronaut.png")} style={{ height: 100, width: 100 }} />,
                    title: "Triangle",
                    subtitle: "Beautiful, isn't it?",
                },
            ]}
        />
    );
}
