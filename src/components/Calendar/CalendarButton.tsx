// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

// Component Imports

// Design Imports

export default function CalendarButton({ setVisiblePage, setShowButtons }: {
    setVisiblePage: (v: string) => void,
	setShowButtons: (b: boolean) => void
}): JSX.Element {

	function buttonHandle(){
		setShowButtons(false);
		setVisiblePage("3");
	}

	return(
		<Icon
			style={{ padding: 10,
				margin: 12 }}
			onPress={() => buttonHandle()}
			name="calendar" size={30} color="white"
		/>
	);
}
