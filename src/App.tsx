
import React, { useState } from "react";
import { Route, SafeAreaView, StatusBar, useWindowDimensions, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";

import BottomMenuTab from "./components/Menus/BottomMenuTab";
import SupplementModal from "./components/SupplementViews/SupplementModal";
import { SupplementMapObject, SupplementObject } from "./interfaces/Supplement";
import CalendarPage from "./screens/CalendarPage";
import HomePage from "./screens/HomePage";
import SupplementInfoPage from "./screens/SupplementInfoPage";
import getCurrentDate, { generateCurrentDateObject, generateWeekList, grabMonth } from "./utilities/getCurrentDate";
import { TabView } from "react-native-tab-view";
import { AppProps } from "./interfaces/Props";
import { LogBox } from "react-native";
import HeaderWindow from "./components/HomePage/HeaderWindow";
import { WeekDay } from "./interfaces/WeekDay";
import SupplementList from "./assets/SupplementList.json";
import CalendarDotObject from "./interfaces/Calendar";
import ModalObject from "./interfaces/Modal";

LogBox.ignoreLogs(["Sending"]);

const App = () => {
    // Data structure that handles supplements and journal enttry for a given day
    const [supplementMap, setSupplementMap] = useState<Record<string, SupplementMapObject>>({});
    // Returns string date in format - MM/DD/YYYY
    const [daySelected, setDaySelected] = useState<string>(getCurrentDate);
    // Returns DateData object of date
    const [objDaySelected, setObjDaySelected] = useState<DateData>(generateCurrentDateObject);
    // Boolean that toggles sub menu
    const [showButtons, setShowButtons] = useState<boolean>(false);
    // List of dates that tells the Calendar component which dates require dots and the selected background
    const [selectedDates, setSelectedDates] = useState<CalendarDotObject>({ [objDaySelected.dateString]: { dots: [{ key: "", color: "" }], selected: true } });
    // Returns journal entry text
    const [journalText, setJournalText] = useState<string>("");
    // Sets visibility of modals: "hide-modal", "journal", "weekly-modal", "supplement-modal", "time-modal", "calendar-modal"
    const [modalVisible, setModalVisible] = useState<ModalObject>({ modal: "hide-modal" });
    // Index for page sliding
    const [index, setIndex] = React.useState(1);
    // Prev Page feature
    const [prevIndex, setPrevIndex] = useState<number>(index);
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

    const [routes] = useState([
        { key: "cal", title: "Calendar" },
        { key: "home", title: "Home" },
        { key: "supp", title: "Supplements" },
        { key: "work", title: "Workouts" },
    ]);
    const layout = useWindowDimensions();

    const AllProps: AppProps = {
        setDaySelected,
        daySelected,
        setModalVisible,
        modalVisible,
        setSupplementMap,
        supplementMap,
        setObjDaySelected,
        objDaySelected,
        setSelectedDates,
        selectedDates,
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
        multipleAddMode
    };

    const CalendarRoute = (): JSX.Element => {
        return <CalendarPage {...AllProps} ></CalendarPage>;
    };

    const WorkoutPage = (): JSX.Element => {
        return <View style={{ flex: 1, backgroundColor: "#ff4081" }} />;
    };

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
            return <WorkoutPage />;
        default:
            return null;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#0B172A" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
        
                <View style={{ flex: 1, opacity: (modalVisible.modal !== "hide-modal" && modalVisible.modal !== "time-modal") ? 0.5 : 1 }}>
                    <View style={{ flex: 1 }}>
                        <SupplementModal {...AllProps}></SupplementModal>
                        <HeaderWindow {...AllProps}></HeaderWindow>
                        <TabView
                            onSwipeStart={() => setPrevIndex(index)}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            tabBarPosition="bottom"
                            renderTabBar={() => <BottomMenuTab {...AllProps}/>}
                        />
                    </View>
					
                </View>

            </SafeAreaView>
        </View>
    );
};

export default App;
