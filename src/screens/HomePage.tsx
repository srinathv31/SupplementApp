// Source Imports
import React from "react";
import { View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import DetailedSupplementModal from "../components/SupplementViews/DetailedSupplementModal";
import { AppProps } from "../interfaces/Props";


export default function HomePage(AllProps: AppProps): JSX.Element {

	return(
		<View>
			<DetailedSupplementModal
				{...AllProps}
			></DetailedSupplementModal>
			<ExploreWindow
				{...AllProps}
			></ExploreWindow>
			<Divider length="full"></Divider>
			<DailySupplementWindow
				{...AllProps}
			></DailySupplementWindow>
		</View>
	);
}
