import { ClientState } from "../zustand/clientStore";

export default function deleteSupplementMapDate(supplementMap: ClientState["supplementMap"], daySelected: ClientState["daySelected"]) {
    if (supplementMap[daySelected].SupplementSchedule.length === 0 && supplementMap[daySelected].JournalEntry === "" && Object.keys(supplementMap[daySelected].DailyMood).length === 0 && supplementMap[daySelected].DailyWater.completed < 1){
        delete supplementMap[daySelected];
    }
}
