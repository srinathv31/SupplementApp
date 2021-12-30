// Source Imports
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import LinearGradient from "react-native-linear-gradient";

// Component Imports

// Design Imports

export default function ExploreWindow(): JSX.Element {
	const [randomSupplement, setRandomSupplement] = useState<number>(0);
	const [randomGradient, setRandomGradient] = useState<number>(0);

	const colors = [["#0016e4", "#ccb5e8"], ["#ee0979", "#ff6a00"], ["#004FF9", "#FFF94C"]];

	useEffect(() => {
		const interval = setInterval(() => {
			grabRandomSupplement();
		}, 10000);
	
		return () => (clearInterval(interval)); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);

	function grabRandomSupplement(): number {
		const randomIndex = Math.floor(Math.random() * (SupplementList.length - 0) + 0);
		setRandomSupplement(randomIndex);
		return randomIndex;
	}
	function grabRandomGradient() {
		const randomIndex = Math.floor(Math.random() * (colors.length - 0) + 0);
		setRandomGradient(randomIndex);
	}

	return(
		<LinearGradient colors={["#ee0979", "#ff6a00"]} style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "20%", borderRadius: 10, padding: 10, margin: 10 }}>
			<Text style={{ fontSize: 26, fontWeight: "600" }}>Explore</Text>
			<Text style={{ fontSize: 20 }}>{SupplementList[randomSupplement].name}</Text>
			<Text style={{ fontSize: 18 }}>{SupplementList[randomSupplement].description}</Text>
		</LinearGradient>

	);
}
