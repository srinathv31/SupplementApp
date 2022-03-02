import Share from "react-native-share";
import { Achievement } from "../interfaces/Achievements";
import { AppProps } from "../interfaces/Props";
import { SupplementObject } from "../interfaces/Supplement";

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

export const sharePlan = async (supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"]) => {
    try {
        await Share.open({ message: `My ${daySelected}'s Supplement Schedule:\n${grabSupplementPlan(supplementMap, daySelected)}` });
    } catch (e) {
        console.log(e);
    }
};

function grabSupplementPlan(supplementMap: AppProps["supplementMap"], daySelected: AppProps["daySelected"]){
    const supplementList: string[] = [];
    Object.values(supplementMap[daySelected].SupplementSchedule).forEach(item => {
        supplementList.push(`\n${item.time}: ${item.Supplement.name}`);
    });
    return supplementList;
}
