// Source Imports
import React from "react";
import MonthView from "../components/Calendar/MonthView";
import WeeklySupplementModal from "./WeekView";


export default function CalendarPage(): JSX.Element {
    return(
        <>
            <WeeklySupplementModal />
            <MonthView />
        </>
    );
}
