// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

// Component Imports

// Design Imports

export default function CalendarButton({ setVisiblePage }: {
    setVisiblePage: (v: string) => void
}): JSX.Element {
	return(
		<Icon
			style={{ padding: 10,
				margin: 12 }}
			onPress={() => setVisiblePage("3")}
			name="calendar" size={30} color="white"
		/>
	);
}
