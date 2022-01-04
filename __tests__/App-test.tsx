/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../src/App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { generateCurrentDateObject, generateWeekList } from "../src/utilities/getCurrentDate";

it("renders correctly", () => {
	renderer.create(<App />);
});

it("Creates a week", () => {
	const week = generateWeekList(generateCurrentDateObject());
	
	expect(week.length === 7);
});

