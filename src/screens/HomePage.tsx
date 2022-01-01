// Source Imports
import React from "react";
import { View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import HeaderWindow from "../components/HomePage/HeaderWindow";
import { AppProps } from "../interfaces/Props";

// Component Imports

// Design Imports

export default function HomePage(AllProps: AppProps): JSX.Element {
	return(
		<View>
			<HeaderWindow
				{...AllProps}
			></HeaderWindow>
			<ExploreWindow></ExploreWindow>
			<Divider></Divider>
			<DailySupplementWindow
				{...AllProps}
			></DailySupplementWindow>
		</View>
	);
}
