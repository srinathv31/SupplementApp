// Source Imports
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";

// Component Imports

// Design Imports

export default function ExploreWindow(): JSX.Element {
	const [randomSupplement, setRandomSupplement] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			grabRandomSupplement();
		}, 5000);
	
		return () => (clearInterval(interval)); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);

	function grabRandomSupplement(): number {
		const randomIndex = Math.floor(Math.random() * (SupplementList.length - 0) + 0);
		setRandomSupplement(randomIndex);
		return randomIndex;
	}

	return(
		<View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "orange", height: "20%", borderRadius: 10, padding: 10, margin: 10 }}>
			<Text style={{ fontSize: 22, fontWeight: "600",  }}>Explore</Text>
			<Text>{SupplementList[randomSupplement].name}</Text>
			<Text>{SupplementList[randomSupplement].description}</Text>
		</View>
	);
}
