
import React, { useEffect, useState } from "react";
import { LogBox, Route, SafeAreaView, StatusBar, useWindowDimensions, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import { TabView } from "react-native-tab-view";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import MoodAnalysis from "../components/Mood/MoodAnalysis";
import SupplementModal from "../components/SupplementViews/SupplementModal";
import ModalObject from "../interfaces/Modal";
import { AppProps } from "../interfaces/Props";
import { SupplementMapObject, SupplementObject } from "../interfaces/Supplement";
import User from "../interfaces/User";
import { WeekDay } from "../interfaces/WeekDay";
import BottomMenuTab from "../components/Menus/BottomMenuTab";
import getCurrentDate, { generateCurrentDateObject, generateWeekList, grabMonth } from "../utilities/getCurrentDate";
import { checkForSave } from "../utilities/saveLoadFunctions/storageChecker";
import CalendarPage from "./CalendarPage";
import HomePage from "./HomePage";
import SupplementInfoPage from "./SupplementInfoPage";
import UserInfoPage from "./UserInfoPage";
import WelcomePage from "./WelcomePage";
import SupplementList from "../assets/SupplementList.json";

LogBox.ignoreLogs(["Sending"]);

const MainScreen = () => {
   
    // Data structure for User Data
    const [userData, setUserData] = useState<User>({ name: "Happy", age: 25, data: { supplementMap: {}, selectedDates: {} } });
    // Data structure that handles supplements and journal enttry for a given day
    const [supplementMap, setSupplementMap] = useState<Record<string, SupplementMapObject>>({});
    // Returns string date in format - MM/DD/YYYY
    const [daySelected, setDaySelected] = useState<string>(getCurrentDate);
    // Returns DateData object of date
    const [objDaySelected, setObjDaySelected] = useState<DateData>(generateCurrentDateObject);
    // Boolean that toggles sub menu
    const [showButtons, setShowButtons] = useState<boolean>(false);
    // Returns journal entry text
    const [journalText, setJournalText] = useState<string>("");
    // Sets visibility of modals: "hide-modal", "journal", "weekly-modal", "supplement-modal", "time-modal", "calendar-modal"
    const [modalVisible, setModalVisible] = useState<ModalObject>({ modal: "hide-modal" });
    // Index for page sliding
    const [index, setIndex] = React.useState(1);
    // Page feature
    const [prevIndex, setPrevIndex] = useState<number>(5);
    // Renders the selected day's week for the weekly modal
    const [week, setWeek] = useState<WeekDay[]>(generateWeekList(generateCurrentDateObject()));
    // Sets the text for the weekly modal
    const [monthText, setMonthText] = useState<string>(grabMonth(week));
    // Sets Animation for Weekly modal
    const [swipeAnimation, setSwipeAnimation] = useState<string>("fadeIn");
    // Tracks selected supplement for mass adding and time changing features
    const [selectedSupplement, setSelectedSupplement] = useState<SupplementObject>({ Supplement: SupplementList[0], time: "", taken: "not-taken" });
    // Sets app in multipleAdd State mode
    const [multipleAddMode, setMultipleAddMode] = useState<boolean>(false);

    const [mood, setMood] = useState<string>("");

    // UseEffect loads in saved data from phone on App Load once
    useEffect(() => {
        checkForSave(AllProps);
    }, []);

    const [routes] = useState([
        { key: "cal", title: "Calendar" },
        { key: "home", title: "Home" },
        { key: "supp", title: "Supplements" },
        { key: "work", title: "Workouts" },
    ]);
    const layout = useWindowDimensions();

    const AllProps: AppProps = {
        setUserData,
        userData,
        setDaySelected,
        daySelected,
        setModalVisible,
        modalVisible,
        setSupplementMap,
        supplementMap,
        setObjDaySelected,
        objDaySelected,
        setShowButtons,
        showButtons,
        setIndex,
        index,
        setPrevIndex,
        prevIndex,
        setJournalText,
        journalText,
        setWeek,
        week,
        setMonthText,
        monthText,
        setSwipeAnimation,
        swipeAnimation,
        setSelectedSupplement,
        selectedSupplement,
        setMultipleAddMode,
        multipleAddMode,
        setMood,
        mood
    };

    const CalendarRoute = (): JSX.Element => {
        return <CalendarPage {...AllProps} ></CalendarPage>;
    };

    // const WorkoutPage = (): JSX.Element => {
    //     return <View style={{ flex: 1, backgroundColor: "#ff4081" }} >
    //         <Text>{supplementMap[daySelected] === undefined ? "No Mood Selected Today" : supplementMap[daySelected].DailyMood.mood}</Text>
    //     </View>;
    // };

    const renderScene = ({ route }: {
		route: Route
	}) => {
        switch (route.key) {
        case "home":
            return <HomePage {...AllProps}/>;
        case "cal":
            return <CalendarRoute />;
        case "supp":
            return <SupplementInfoPage {...AllProps}/>;
        case "work":
            return <MoodAnalysis {...AllProps} />;
        default:
            return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <View style={{ flex: 1, opacity: (modalVisible.modal !== "hide-modal" && modalVisible.modal !== "time-modal" && modalVisible.modal !== "disable-header") ? 0.5 : 1 }}>
                    <View style={{ flex: 1 }}>
                        { prevIndex === 5 && <WelcomePage {...AllProps} /> }
                        { prevIndex !== 5 && <>
                            <UserInfoPage {...AllProps}></UserInfoPage>
                            <SupplementModal {...AllProps}></SupplementModal>
                            <HeaderWindow {...AllProps}></HeaderWindow>
                            <TabView
                                onSwipeStart={() => setPrevIndex(index)}
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={{ width: layout.width }}
                                tabBarPosition="bottom"
                                renderTabBar={() => <BottomMenuTab {...AllProps} />}
                            /></> }
                    </View>
					
                </View>

            </SafeAreaView>
        </View>
    );
};

export default MainScreen;
