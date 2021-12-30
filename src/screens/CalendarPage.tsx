// Source Imports
import React from "react";
import { DateData } from "react-native-calendars/src/types";
import MonthView from "../components/Calendar/MonthView";
import DailySupplementModal from "../components/SupplementViews/DailySupplementModal";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function CalendarPage({ setModalVisible, modalVisible, setDaySelected, setSupplementMap, supplementMap, daySelected, setVisiblePage, setObjDaySelected, objDaySelected, setSelectedDates, selectedDates }: {
    setModalVisible: (m: string) => void, modalVisible: string,
    setDaySelected: (d: string) => void,
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
    setVisiblePage: (v: string) => void,
    setObjDaySelected: (d: DateData) => void, objDaySelected: DateData,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
}): JSX.Element {
	return(
		<>
			<DailySupplementModal
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
				setSupplementMap={setSupplementMap}
				supplementMap={supplementMap}
				daySelected={daySelected}
				setSelectedDates={setSelectedDates}
				selectedDates={selectedDates}
				objDaySelected={objDaySelected}
			></DailySupplementModal>
			<MonthView
				setDaySelected={setDaySelected}
				setModalVisible={setModalVisible}
				setVisiblePage={setVisiblePage}
				setObjDaySelected={setObjDaySelected}
				objDaySelected={objDaySelected}
				setSelectedDates={setSelectedDates}
				selectedDates={selectedDates}
			></MonthView>
		</>
	);
}
