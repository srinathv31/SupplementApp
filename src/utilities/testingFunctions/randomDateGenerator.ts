import { SupplementObject } from "../../interfaces/Supplement";
import { convertStringTimeToDateTime } from "../convertTime";
import SupplementList from "../../assets/SupplementList.json";

export function randomDateGenerator() {
    const randomDates = [];
    const testSupplement: SupplementObject = {
        Supplement: SupplementList[0],
        time: "07:30 PM",
        taken: "not-taken"
    };
    while(randomDates.length < 50){
        const month = Math.floor(Math.random() * (12 - 1 + 1) + 1);
        const day = Math.floor(Math.random() * (31 - 1 + 1) + 1);
        const year = Math.floor(Math.random() * (3000 - 1945 + 1) + 1945);
        isNaN(convertStringTimeToDateTime(testSupplement, `${month}/${day}/${year}`).getMonth()) === false
            ? randomDates.push(`${month}/${day}/${year}`)
            : console.log("invalid date");
    }
    return randomDates;
}
