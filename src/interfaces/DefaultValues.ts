import { penguinPic } from "../assets/imageURLs/profilePictureURLs";
import { ListOfAchievements } from "./Achievements";
import SupplementList from "../assets/SupplementList.json";
import User from "./User";
import { SupplementObject } from "./Supplement";

export const userDefaultValue: User = { name: "", lastName: "", age: "", picture: penguinPic, data: { supplementMap: {}, selectedDates: {}, waterGoal: 2000 }, premiumStatus: true, achievements: ListOfAchievements };
export const selectedSupplementDefaultValue: SupplementObject = { Supplement: SupplementList[0], time: "", taken: "not-taken" };
