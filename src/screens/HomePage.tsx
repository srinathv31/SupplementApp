// Source Imports
import React, { useState } from "react";
import { View } from "react-native";
import Divider from "../components/Design/Divider";
import DailySupplementWindow from "../components/HomePage/DailySupplementWindow";
import ExploreWindow from "../components/HomePage/ExploreWindow";
import DetailedSupplementModal from "../components/SupplementViews/DetailedSupplementModal";
import { AppProps } from "../interfaces/Props";
import { SupplementObject } from "../interfaces/Supplement";


export default function HomePage(AllProps: AppProps): JSX.Element {
	const [exploreSupplement, setExploreSupplement] = useState<SupplementObject>(AllProps.selectedSupplement);

	return(
		<View>
			<DetailedSupplementModal
				{...AllProps}
				selectedSupplement={exploreSupplement}
			></DetailedSupplementModal>
			<ExploreWindow
				setExploreSupplement={setExploreSupplement}
				setModalVisible={AllProps.setModalVisible}
			></ExploreWindow>
			<Divider length="full"></Divider>
			<DailySupplementWindow
				{...AllProps}
			></DailySupplementWindow>
		</View>
	);
}
