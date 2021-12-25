// Source Imports
import React from "react";
import { Text } from "react-native";
import MonthView from "../components/Calendar/MonthView";

// Component Imports

// Design Imports

export default function CalendarPage({ setDaySelected }: {
    setDaySelected: (d: string) => void
}): JSX.Element {
    return(
        <MonthView
            setDaySelected={setDaySelected}
        ></MonthView>
    );
}
