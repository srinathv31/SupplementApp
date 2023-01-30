import Share from "react-native-share";
import { Achievement } from "../interfaces/Achievements";
import { SupplementObject } from "../interfaces/Supplement";
import RNFS from "react-native-fs";
import { ClientState } from "../zustand/clientStore";
interface SupplementShareObject {
    name: string,
    time: string,
    taken: "not-taken" | "missed" | "taken-off-time" | "taken-on-time",
    takenOffTime?: string,
    note?: string,
    dosage?: string
    unit: string
}

export const shareUrl = async (urlToShare: string, selectedSupplement: SupplementObject) => {
    try { 
        await Share.open({ url: urlToShare, message: `Check out this Supplement called ${selectedSupplement.Supplement.name}!` });
    } catch (e) {
        console.log(e);
    }
};

export const shareAchievement = async (item: Achievement, total: number) => {
    try { 
        await Share.open({ message: `I just unlocked the: \n\n[${item.name}]\n\nachievement! I'm up to ${total}/15 achievements.` });
    } catch (e) {
        console.log(e);
    }
};

export const sharePlan = async (supplementMap: ClientState["supplementMap"], daySelected: string) => {
    try {
        await Share.open({ message: `My ${daySelected}'s Supplement Schedule:\n${grabSupplementPlan(supplementMap, daySelected)}` });
    } catch (e) {
        console.log(e);
    }
};

export const shareEntirePlan = async (supplementMap: ClientState["supplementMap"]) => {
    try {
        await Share.open({ url: grabEntireSupplementPlan(supplementMap) });
    } catch (e) {
        console.log(e);
    }
};

function grabSupplementPlan(supplementMap: ClientState["supplementMap"], daySelected: string){
    const supplementList: string[] = [];
    Object.values(supplementMap[daySelected].SupplementSchedule).forEach(item => {
        supplementList.push(`\n${item.time}: ${item.Supplement.name}`);
    });
    return supplementList;
}

function grabEntireSupplementPlan(supplementMap: ClientState["supplementMap"]){
    const supplementPlan: Record<string, SupplementShareObject[]> = {};
    const listOfDates: string[] = []; 
    
    Object.keys(supplementMap).forEach(date => {
        listOfDates.push(date);
    });

    const listOfSortedDates: string[] = sortDates(listOfDates);

    // Add each day into the supplementPlan Object in chronological order
    Object.values(listOfSortedDates).forEach(date => {
        Object.values(supplementMap[date].SupplementSchedule).forEach(item => {
            if (supplementPlan[date] === undefined){
                supplementPlan[date] = [];
            }

            supplementPlan[date].push({
                name: item.Supplement.name,
                time: item.time,
                taken: item.taken,
                takenOffTime: item.takenOffTime,
                note: item.note,
                dosage: item.dosage,
                unit: item.Supplement.dosageMetric
            });
        });
    });
    
    // convertJSONtoCSV returns a path where the .csv file is saved on the local machine
    const csvPath = convertJSONtoCSV(supplementPlan);
    return csvPath;
}

function sortDates(listOfDates: string[]){
    const listOfDateObjects: Date[] = [];
    const sortedListOfDates: string[] = [];
    
    listOfDates.forEach(date => {
        listOfDateObjects.push(new Date(date));
    });

    const length = listOfDateObjects.length; 
    for(let i=0;i<length;i++){
        let tmp = listOfDateObjects[0];
        let tmpIndex = 0;

        listOfDateObjects.forEach((dateObj, index) => {
            if (dateObj < tmp) {
                tmp = dateObj;
                tmpIndex = index;
            }
        });
        sortedListOfDates.push(`${tmp.getMonth()+1}/${tmp.getDate()}/${tmp.getFullYear()}`);
        listOfDateObjects.splice(tmpIndex, 1);
    }
    return sortedListOfDates;
}

function convertJSONtoCSV(supplementPlan: Record<string, SupplementShareObject[]>) {
    let convertedCSVFile = "Date,Name,Time,Taken,TakenOffTime,Note,Dosage,Unit";
    Object.keys(supplementPlan).forEach(date => {
        Object.values(supplementPlan[date]).forEach(item => {
            convertedCSVFile = convertedCSVFile.concat(`\n${date},${item.name},${item.time},${item.taken},${item.takenOffTime === undefined ? "" : item.takenOffTime},${item.note === undefined ? "" : item.note},${item.dosage === undefined ? "" : item.dosage},${item.unit}`);
        });
    });
    const csvPath = createCSV(convertedCSVFile);
    return csvPath;
}

function createCSV(convertedCSV: string) {
    const date = new Date();
    const dateString = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
    const path = RNFS.DocumentDirectoryPath + `/Supplement-Schedule-from-Vital-App-${dateString}.csv`;

    // write the .csv file to the local machine
    RNFS.writeFile(path, convertedCSV, "utf8")
        .then((success) => {
            console.log("CSV FILE WRITTEN!", success);
        })
        .catch((err) => {
            console.log(err.message);
        });

    return path;
}
