// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports

export default function CalendarButton( { setShowButtons, setIndex }: AppProps ): JSX.Element {

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
