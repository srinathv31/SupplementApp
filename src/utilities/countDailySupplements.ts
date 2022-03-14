import { AppProps } from "../interfaces/Props";

export function countDailySupplements(supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"]) {
    let count = 0;
    if (supplementMap[daySelected] !== undefined) {
        Object.values(supplementMap[daySelected].SupplementSchedule).forEach(item => {
            if (item !== undefined){
                count++;
            }
        });
    }
   
    return count;
}
