import React, { useEffect, useState } from "react";
import { LogBox, Route, SafeAreaView, StatusBar, useWindowDimensions, View } from "react-native";
import { TabView } from "react-native-tab-view";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import MoodAnalysis from "../components/Mood/MoodAnalysis";
import SupplementModal from "../components/SupplementViews/SupplementModal";
import BottomMenuTab from "../components/Menus/BottomMenuTab";
import { checkForSave } from "../utilities/saveLoadFunctions/storageChecker";
import CalendarPage from "./CalendarPage";
import HomePage from "./HomePage";
import SupplementInfoPage from "./SupplementInfoPage";
import UserInfoPage from "./UserInfoPage";
import WelcomePage from "./WelcomePage";
import CustomToast from "../components/Toast/customToast";
import { generateLoginPeriod } from "../utilities/generateTimeGreetings";
import { achievementUnlocked } from "../utilities/handleAchievementEvents";
import saveUserData, { saveUserToPhone } from "../utilities/saveLoadFunctions/saveUserData";
import { requestUserPermission } from "../utilities/authentication/notifications";
import useClientStore from "../zustand/clientStore";
import shallow from "zustand/shallow";
LogBox.ignoreLogs(["Sending"]);

export default function MainScreen(): JSX.Element {
    // Client State
    const { userData, updateUserData } = useClientStore(state => ({ userData: state.userData, updateUserData: state.updateUserData }), shallow);
    const page = useClientStore(state => state.page);
    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    const updateShowButtons = useClientStore(state => state.updateShowButtons);
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const modalVisible = useClientStore(state => state.modalVisible);
    const index = useClientStore(state => state.index);
    const updateIndex = useClientStore(state => state.updateIndex);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);

    // UseEffect loads in saved data from phone on App Load once
    useEffect(() => {
        checkForSave(userData, updateUserData, updateCompletedAchievements, updateSupplementMap);
    }, []);

    // Checks login time for achievements
    useEffect(() => {
        const greeting = generateLoginPeriod();
        if (greeting === "Bird" && completedAchievements[12].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 12);
        }
        if (greeting === "Owl" && completedAchievements[11].color === "white") {
            achievementUnlocked(completedAchievements, updateCompletedAchievements, updateModalVisible, 11);
        }
    },[]);

    // Notification Permissions
    useEffect(() => {
        requestUserPermission();
    }, []);

    useEffect(() => {
        const userCopy = { ...userData };
        userCopy.achievements = completedAchievements;
        updateUserData(userCopy);
        saveUserToPhone(userCopy);
    }, [completedAchievements]);
    
    useEffect(() => {
        saveUserData(userData, updateUserData, supplementMap);
    }, [supplementMap]);

    const [routes] = useState([
        { key: "cal", title: "Calendar" },
        { key: "home", title: "Home" },
        { key: "supp", title: "Supplements" },
        { key: "work", title: "Workouts" },
    ]);
    const layout = useWindowDimensions();

    // Using route for animation to play through
    const CalendarRoute = (): JSX.Element => {
        return <CalendarPage />;
    };

    const renderScene = ({ route }: {
		route: Route
	}) => {
        switch (route.key) {
        case "home":
            return <HomePage />;
        case "cal":
            return <CalendarRoute />;
        case "supp":
            return <SupplementInfoPage />;
        case "work":
            return <MoodAnalysis />;
        default:
            return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
                <View style={{ flex: 1, opacity: (modalVisible !== "hide-modal" && modalVisible !== "time-modal" && modalVisible !== "disable-header") ? 0.5 : 1 }}>
                    <View style={{ flex: 1 }}>
                        { page === "loading-screen" && <WelcomePage /> }
                        { page === "app-screen" && <>
                            <UserInfoPage />
                            <SupplementModal />
                            <HeaderWindow />
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={updateIndex}
                                initialLayout={{ width: layout.width }}
                                tabBarPosition="bottom"
                                renderTabBar={() => <BottomMenuTab />}
                                onSwipeEnd={() => updateShowButtons(false)}
                            /></> }
                    </View>
                </View>
            </SafeAreaView>
            {modalVisible !== "achievements-modal" && modalVisible !== "journal" && modalVisible !== "info-modal" && modalVisible !== "user-modal" && modalVisible !== "edit-name"
                && modalVisible !== "weekly-modal" && modalVisible !== "supplement-modal"
            && <CustomToast />}
        </View>
    );
}
