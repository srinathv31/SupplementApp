// Source Imports
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AppProps } from "../../interfaces/Props";

// Component Imports

// Design Imports

export default function PrevPageButton( { setShowButtons, setIndex, index, setPrevIndex, prevIndex }: AppProps ): JSX.Element {

	function buttonHandle(){
		setShowButtons(false);
		setPrevIndex(index);
		setIndex(prevIndex);
	}

	return(
		<Icon
			style={{ padding: 10,
				margin: 12 }}
			onPress={() => buttonHandle()}
			name="arrow-undo-outline" size={30} color="white"
		/>
	);
}
