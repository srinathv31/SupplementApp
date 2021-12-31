
import React, { useState } from "react";
import { Route, SafeAreaView, StatusBar, useWindowDimensions, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";

import BottomMenuTab from "./components/Menus/BottomMenuTab";
import SupplementModal from "./components/SupplementViews/SupplementModal";
import Supplement from "./interfaces/Supplement";
import CalendarPage from "./screens/CalendarPage";
import HomePage from "./screens/HomePage";
import SupplementInfoPage from "./screens/SupplementInfoPage";
import getCurrentDate, { generateCurrentDateObject } from "./utilities/getCurrentDate";
import { TabView, SceneMap } from "react-native-tab-view";


const App = () => {
	const [supplementMap, setSupplementMap] = useState<Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>>({});
	const [daySelected, setDaySelected] = useState<string>(getCurrentDate);
	const [objDaySelected, setObjDaySelected] = useState<DateData>(generateCurrentDateObject);
	const [showButtons, setShowButtons] = useState<boolean>(false);

	const [selectedDates, setSelectedDates] = useState<{[date: string]: {dots: [{key: string, color: string}], selected: boolean}}>({ [objDaySelected.dateString]: { dots: [{ key: "", color: "" }], selected: true } });


	// 1 - journal, 2 - supplement modal, 3 - daily supp modal
	const [modalVisible, setModalVisible] = useState<string>("0");

	// console.log(objDaySelected?.dateString);
	console.log(supplementMap);
	console.log(selectedDates);

	const HomeRoute = () => (
		<HomePage
			setModalVisible={setModalVisible}
			modalVisible={modalVisible}
			setSupplementMap={setSupplementMap}
			supplementMap={supplementMap}
			daySelected={daySelected}
			setDaySelected={setDaySelected}
			setObjDaySelected={setObjDaySelected}
			objDaySelected={objDaySelected as DateData}
			setSelectedDates={setSelectedDates}
			selectedDates={selectedDates}
			setShowButtons={setShowButtons}
			setIndex={setIndex}
		></HomePage>
	);
	
	const CalendarRoute = () => (
		<CalendarPage
			setDaySelected={setDaySelected}
			daySelected={daySelected}
			setModalVisible={setModalVisible}
			modalVisible={modalVisible}
			setSupplementMap={setSupplementMap}
			supplementMap={supplementMap}
			setObjDaySelected={setObjDaySelected}
			objDaySelected={objDaySelected as DateData}
			setSelectedDates={setSelectedDates}
			selectedDates={selectedDates}
			setIndex={setIndex}
		></CalendarPage>
	);
	
	const SupplementRoute = (): JSX.Element => {
		return <SupplementInfoPage
			setSupplementMap={setSupplementMap}
			supplementMap={supplementMap}
			daySelected={daySelected}
			setSelectedDates={setSelectedDates}
			selectedDates={selectedDates}
			objDaySelected={objDaySelected as DateData}
		></SupplementInfoPage>;
	};

	const WorkoutRoute = (): JSX.Element => {
		return <View style={{ flex: 1, backgroundColor: "#ff4081" }} />;
	};

	const renderScene = SceneMap({
		second: CalendarRoute,
		first: HomeRoute,
		supp: SupplementRoute,
		work: WorkoutRoute
	});

	const [index, setIndex] = React.useState(1);
	const [routes] = useState<Route[]>([
		{ key: "second", title: "Calendar" },
		{ key: "first", title: "Home" },
		{ key: "supp", title: "Calendar" },
		{ key: "work", title: "Workout" },
	]);
	const layout = useWindowDimensions();

	return (
		<View style={{ flex: 1, backgroundColor: "#0B172A" }}>
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar barStyle={"light-content"} />
        
				<View style={{ flex: 1, opacity: (modalVisible !== "0") ? 0.5 : 1 }}>
					<View style={{ flex: 1 }}>
						<SupplementModal
							setModalVisible={setModalVisible}
							modalVisible={modalVisible}
							setSupplementMap={setSupplementMap}
							supplementMap={supplementMap}
							daySelected={daySelected}
							setSelectedDates={setSelectedDates}
							selectedDates={selectedDates}
							objDaySelected={objDaySelected as DateData}
						></SupplementModal>
						<TabView
							navigationState={{ index, routes, key: index }}
							renderScene={renderScene}
							onIndexChange={setIndex}
							initialLayout={{ width: layout.width }}
							tabBarPosition="bottom"
							renderTabBar={() => <BottomMenuTab
								setModalVisible={setModalVisible}
								setShowButtons={setShowButtons}
								showButtons={showButtons}
								index={index}
								setIndex={setIndex}
							/>}
						/>
					</View>
					
				</View>

			</SafeAreaView>
		</View>
	);
};

export default App;
