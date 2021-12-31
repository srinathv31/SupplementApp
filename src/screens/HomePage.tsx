// Source Imports
import React from "react";
import { View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function HomePage({ setModalVisible, modalVisible, setSupplementMap, supplementMap, setDaySelected, daySelected, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates, setShowButtons, setIndex }: {
    setModalVisible: (j: string) => void, modalVisible: string,
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    setDaySelected: (d: string) => void, daySelected: string,
    setObjDaySelected: (o: DateData) => void, objDaySelected: DateData,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
	setShowButtons: (b: boolean) => void,
	setIndex: (i: number) => void,
}): JSX.Element {
	return(
		<View>
			<HeaderWindow
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
				setIndex={setIndex}
				daySelected={daySelected}
				setDaySelected={setDaySelected}
				setObjDaySelected={setObjDaySelected}
				objDaySelected={objDaySelected}
				setSelectedDates={setSelectedDates}
				selectedDates={selectedDates}
				setSupplementMap={setSupplementMap}
				supplementMap={supplementMap}
				setShowButtons={setShowButtons}
			></HeaderWindow>
			<ExploreWindow></ExploreWindow>
			<Divider></Divider>
			<DailySupplementWindow
				setSupplementMap={setSupplementMap}
				supplementMap={supplementMap}
				daySelected={daySelected}
				setSelectedDates={setSelectedDates}
				selectedDates={selectedDates}
				objDaySelected={objDaySelected}
			></DailySupplementWindow>
		</View>
	);
}
