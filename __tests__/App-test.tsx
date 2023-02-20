/**
 * @format
 */

import "react-native";
// import React from "react";
// import App from "../src/App";

// // Note: test renderer must be required after react-native.
// import renderer from "react-test-renderer";
import { generateCurrentDateObject, generateWeekList } from "../src/utilities/getCurrentDate";
import { randomDateGenerator } from "../src/utilities/testingFunctions/randomDateGenerator";
import SupplementList from "../src/assets/SupplementList.json";
import { SupplementObject } from "../src/interfaces/Supplement";
import { convertStringTimeToDateTime } from "../src/utilities/convertTime";

// it("renders correctly", () => {
// 	renderer.create(<App />);
// });

it("Creates a week", () => {
    const week = generateWeekList(generateCurrentDateObject());
	
    expect(week.length === 7);
});

it("Creates a Date Object from the given Date String 50 times", () => {
    const correctDateFormatList = [];
    const randomDates = randomDateGenerator();
    const testSupplement: SupplementObject = {
        Supplement: SupplementList[0],
        time: "07:30 PM",
        taken: "not-taken"
    };
    randomDates.forEach((item) => {
        const generatedDateObject = convertStringTimeToDateTime(testSupplement, item);
        if (isNaN(generatedDateObject.getMonth()) === false){
            correctDateFormatList.push(generatedDateObject);
        }
    });
    expect(correctDateFormatList.length).toEqual(50);
});
