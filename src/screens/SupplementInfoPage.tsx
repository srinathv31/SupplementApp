// Source Imports
import React, { useState } from "react";
import { View } from "react-native";
import { DateData } from "react-native-calendars/src/types";
import SearchBar from "../components/SupplementViews/SearchBar";
import SupplementListView from "../components/SupplementViews/SupplementListView";
import Supplement from "../interfaces/Supplement";

// Component Imports

// Design Imports

export default function SupplementInfoPage({ setSupplementMap, supplementMap, daySelected, setSelectedDates, selectedDates, objDaySelected }: {
    setSupplementMap: (d: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>) => void, supplementMap: Record<string, {SupplementSchedule: Supplement[], JournalEntry: string}>,
    daySelected: string,
	setSelectedDates: (d: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}}) => void, selectedDates: {[date: string]: {dots: [{key: string, color: string}], selected: boolean}},
    objDaySelected: DateData
}): JSX.Element {
	const [query, setQuery] = useState<string>("");

	return(
		<View>
			<SearchBar
				setQuery={setQuery}
				query={query}
			></SearchBar>
			<SupplementListView
				setSupplementMap={setSupplementMap}
				supplementMap={supplementMap}
				fontSizeNumber={24}
				query={query}
				daySelected={daySelected}
				setSelectedDates={setSelectedDates}
				selectedDates={selectedDates}
				objDaySelected={objDaySelected}
			></SupplementListView>
		</View>
	);
}
