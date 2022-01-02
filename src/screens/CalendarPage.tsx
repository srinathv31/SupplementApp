// Source Imports
import React from "react";
import MonthView from "../components/Calendar/MonthView";
import { AppProps } from "../interfaces/Props";
import WeeklySupplementModal from "./WeekView";

// Component Imports

// Design Imports

export default function CalendarPage( AllProps: AppProps): JSX.Element {
	return(
		<>
			<WeeklySupplementModal {...AllProps}></WeeklySupplementModal>
			<MonthView {...AllProps}></MonthView>
		</>
	);
}
