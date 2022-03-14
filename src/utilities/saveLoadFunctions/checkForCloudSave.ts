import firestore from "@react-native-firebase/firestore";
import User from "../../interfaces/User";
import { saveUserToPhone } from "./saveUserData";

export async function checkForCloudSave(uid: string) {
    const doesExist = (await firestore().collection("alpha-users").doc(uid).get()).exists;
    return doesExist;
}

export async function grabCloudSave(uid: string, userData: User, setUserData: (u: User) => void) {

    const cloudData = (await firestore().collection("alpha-users").doc(uid).get()).data() as User;
    
    const userToLoad: User = {
        name: cloudData.name,
        lastName: cloudData.lastName,
        age: cloudData.age,
        picture: cloudData.picture,
        data: {
            supplementMap: cloudData.data.supplementMap,
            selectedDates: cloudData.data.selectedDates
        },
        premiumStatus: cloudData.premiumStatus,
        achievements: cloudData.achievements,
        userAuthObj: userData.userAuthObj
    };
    console.log("GRABBING FROM CLOUD...");
    saveUserToPhone(userToLoad);
    setUserData(userToLoad);
}
