// Source Imports
import React from "react";
import MonthView from "../components/Calendar/MonthView";
import DailySupplementModal from "../components/SupplementViews/DailySupplementModal";
import { AppProps } from "../interfaces/Props";

// Component Imports

// Design Imports

export default function CalendarPage( AllProps: AppProps): JSX.Element {
	return(
		<>
			<DailySupplementModal {...AllProps} ></DailySupplementModal>
			<MonthView {...AllProps}></MonthView>
		</>
	);
}
