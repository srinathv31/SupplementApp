import React, { useContext, useEffect, useState } from "react";
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
import { globalPropsContext } from "../contextHooks/GlobalPropsContext";
import useClientStore from "../zustand/clientStore";
import shallow from "zustand/shallow";
LogBox.ignoreLogs(["Sending"]);

export default function MainScreen(): JSX.Element {
    const { setUserData, userData, page } = useContext(globalPropsContext);

    // *** Zustand

    const { supplementMap, updateSupplementMap } = useClientStore(state => ({ supplementMap: state.supplementMap, updateSupplementMap: state.updateSupplementMap }), shallow);
    // Boolean that toggles sub menu
    const updateShowButtons = useClientStore(state => state.updateShowButtons);
    // Sets visibility of modals: "hide-modal", "journal", "weekly-modal", "supplement-modal", "time-modal", "calendar-modal"
    // const [modalVisible, setModalVisible] = useState<ModalType>("hide-modal");
    const updateModalVisible = useClientStore(state => state.updateModalVisible);
    const modalVisible = useClientStore(state => state.modalVisible);
    // Index for page sliding
    const index = useClientStore(state => state.index);
    const updateIndex = useClientStore(state => state.updateIndex);
    // Sets app in multipleAdd State mode
    // const updateMultipleAddMode = useClientStore(state => state.updateMultipleAddMode);
    // Sets Animation for Weekly modal
    // const [swipeAnimation, setSwipeAnimation] = useState<string>("fadeIn");
    // Tracks selected mood for analysis and inputting mood trends
    // const [mood, setMood] = useState<string>("");
    // Returns string date in format - MM/DD/YYYY
    // const [daySelected, setDaySelected] = useState<string>(getCurrentDate);
    // Updates achievements list throughout app
    // const [completedAchievements, setCompletedAchievements] = useState<Achievement[]>(ListOfAchievements);
    const { completedAchievements, updateCompletedAchievements } = useClientStore(state => ({ completedAchievements: state.completedAchievements, updateCompletedAchievements: state.updatedCompletedAchievements }), shallow);
    // Tracks selected supplement for mass adding and time changing features
    // const [selectedSupplement, setSelectedSupplement] = useState<SupplementObject>(selectedSupplementDefaultValue);
    // Returns DateData object of date
    // const [objDaySelected, setObjDaySelected] = useState<DateData>(dateObjInit);
    // Renders the selected day's week for the weekly modal
    // const [week, setWeek] = useState<WeekDay[]>(weekInit);
    // Sets the text for the weekly modal
    // const [monthText, setMonthText] = useState<string>(monthTextInit);
    // Data structure that handles supplements and journal entry for a given day
    // const [supplementMap, setSupplementMap] = useState<Record<string, SupplementMapObject>>({});

    // TODO:

    // UseEffect loads in saved data from phone on App Load once
    useEffect(() => {
        checkForSave(userData, setUserData, updateCompletedAchievements, updateSupplementMap);
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
        setUserData(userCopy);
        saveUserToPhone(userCopy);
    }, [completedAchievements]);
    
    useEffect(() => {
        saveUserData(userData, setUserData, supplementMap);
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
