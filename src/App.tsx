
import React, { useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { DateData } from "react-native-calendars/src/types";

import BottomMenuTab from "./components/Menus/BottomMenuTab";
import SupplementModal from "./components/SupplementViews/SupplementModal";
import Supplement from "./interfaces/Supplement";
import CalendarPage from "./screens/CalendarPage";
import HomePage from "./screens/HomePage";
import SupplementInfoPage from "./screens/SupplementInfoPage";
import getCurrentDate, { generateCurrentDateObject } from "./utilities/getCurrentDate";


const App = () => {
	const [visiblePage, setVisiblePage] = useState<string>("1");
	const [supplementMap, setSupplementMap] = useState<Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>>({});
	const [daySelected, setDaySelected] = useState<string>(getCurrentDate);
	const [objDaySelected, setObjDaySelected] = useState<DateData>(generateCurrentDateObject);

	const [selectedDates, setSelectedDates] = useState<{[date: string]: {marked: boolean, selected: boolean}}>({});


	// 1 - journal, 2 - supplement modal, 3 - daily supp modal
	const [modalVisible, setModalVisible] = useState<string>("0");

	// console.log(objDaySelected?.dateString);
	// console.log(supplementMap);
	console.log("Hi");


	return (
		<View style={{ flex: 1, backgroundColor: "#0B172A"}}>
			<SafeAreaView style={{flex: 1}}>
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
						{ visiblePage === "1" && <HomePage
							setModalVisible={setModalVisible}
							modalVisible={modalVisible}
							setSupplementMap={setSupplementMap}
							supplementMap={supplementMap}
							setVisiblePage={setVisiblePage}
							daySelected={daySelected}
							setDaySelected={setDaySelected}
							setObjDaySelected={setObjDaySelected}
							objDaySelected={objDaySelected as DateData}
							setSelectedDates={setSelectedDates}
							selectedDates={selectedDates}
						></HomePage> }
						{ visiblePage === "2" && <SupplementInfoPage
							setSupplementMap={setSupplementMap}
							supplementMap={supplementMap}
							daySelected={daySelected}
							setSelectedDates={setSelectedDates}
							selectedDates={selectedDates}
							objDaySelected={objDaySelected as DateData}
						></SupplementInfoPage> }
						{ visiblePage === "3" && <CalendarPage
							setDaySelected={setDaySelected}
							daySelected={daySelected}
							setModalVisible={setModalVisible}
							modalVisible={modalVisible}
							setSupplementMap={setSupplementMap}
							supplementMap={supplementMap}
							setVisiblePage={setVisiblePage}
							setObjDaySelected={setObjDaySelected}
							objDaySelected={objDaySelected as DateData}
							setSelectedDates={setSelectedDates}
							selectedDates={selectedDates}
						></CalendarPage> }
					</View>
					<View style={{ flex: 2, justifyContent: "flex-end", maxHeight: "10%" }}>
						<BottomMenuTab
							setVisiblePage={setVisiblePage}
							setModalVisible={setModalVisible}
						></BottomMenuTab>
					</View>
				</View>

			</SafeAreaView>
		</View>
	);
};

export default App;
