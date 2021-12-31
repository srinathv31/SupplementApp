// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

// Component Imports

// Design Imports

export default function CalendarButton({ setIndex, setShowButtons }: {
	setIndex: (i: number) => void,
	setShowButtons: (b: boolean) => void
}): JSX.Element {

	function buttonHandle(){
		setShowButtons(false);
		setIndex(0);
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
