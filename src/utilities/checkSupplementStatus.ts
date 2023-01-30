import { SupplementObject } from "../interfaces/Supplement";
import { ClientState } from "../zustand/clientStore";
import { convertStringTimeToDateTime } from "./convertTime";

export function checkUserSupplementStatus(supplementMap: ClientState["supplementMap"], daySelected: string, updateModalVisible: ClientState["updateModalVisible"], setSupplementsToUpdateStatus: (s: SupplementObject[]) => void){
    const dateNow = new Date();
    const supplementToCheck: SupplementObject[] = [];

    if (supplementMap[daySelected] === undefined || supplementMap[daySelected].SupplementSchedule === undefined){
        return false;
    }

    Object.values(supplementMap[daySelected].SupplementSchedule).forEach(item => {
        if (item.taken === "not-taken"){
            const itemDateTime = convertStringTimeToDateTime(item, daySelected);
            if (dateNow > itemDateTime) {
                supplementToCheck.push(item);
            }
        }
    });
    
    setSupplementsToUpdateStatus(supplementToCheck);
    if (supplementToCheck.length > 0){
        updateModalVisible("status-check-modal");
    }
    return supplementToCheck.length > 0;
}
