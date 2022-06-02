import { penguinPic } from "../assets/imageURLs/profilePictureURLs";
import { ListOfAchievements } from "./Achievements";
import SupplementList from "../assets/SupplementList.json";
import User from "./User";
import { SupplementMapObject, SupplementObject } from "./Supplement";
import Page from "./Page";

export const userDefaultValue: User = { name: "", lastName: "", age: "", picture: penguinPic, data: { supplementMap: {}, selectedDates: {} }, premiumStatus: true, achievements: ListOfAchievements };
export const supplementMapDefaultValue: Record<string, SupplementMapObject> = {};
export const selectedSupplementDefaultValue: SupplementObject = { Supplement: SupplementList[0], time: "", taken: "not-taken" };
export const pageDefaultValue: Page = { page: "login-screen" };
