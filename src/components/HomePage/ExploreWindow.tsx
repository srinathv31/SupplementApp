// Source Imports
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import SupplementList from "../../assets/SupplementList.json";
import * as Progress from "react-native-progress";

// Component Imports

// Design Imports

export default function ExploreWindow(): JSX.Element {
	const [randomSupplement, setRandomSupplement] = useState<number>(0);
	const [x, setX] = useState<number>(0);

	let progress = 0;

	useEffect(() => {
		const interval = setInterval(() => {
			grabRandomSupplement();
			console.log("random");
			if (progress === 0) {
				progress = 1;
			}
			else if (progress === 1) {
				progress = 0;
			}
			setX(progress);
			console.log(progress);
		}, 5000);


		// const timer = setInterval(() => {
		// 	if (progress > 0.40) {
		// 		progress = 0;
		// 	}
		// 	progress += 0.01;
		// 	setX(progress);
		// 	console.log(progress);
		// }, 100);
	
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
			<Progress.Bar animated progress={x} width={200} animationType="spring" height={100} style={{ zIndex: -10 }}/>
		</View>
	);
}
