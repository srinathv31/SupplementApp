import Share from "react-native-share";
import { Achievement } from "../interfaces/Achievements";
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
