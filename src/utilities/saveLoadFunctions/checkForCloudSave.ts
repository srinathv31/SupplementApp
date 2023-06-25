import firestore from "@react-native-firebase/firestore";
import User from "../../interfaces/User";
import { saveUserToPhone } from "./saveUserData";

export async function checkForCloudSave(uid: string) {
    const doesExist = (await firestore().collection("alpha-users").doc(uid).get()).exists;
    return doesExist;
}

export async function grabCloudSave(uid: string, userData: User) {

    const cloudData = (await firestore().collection("alpha-users").doc(uid).get()).data() as User;
    
    // Checking for Water + Resetting moods from legacy Mood Object
    // const fixedCloudData = produce(cloudData, draft => {
    //     Object.entries(cloudData.data.supplementMap).forEach(([key, supplementObj]) => {
    //         if (!supplementObj.DailyWater) {
    //             draft.data.supplementMap[key].DailyWater = { completed: 0, goal: 2000 };
    //         }
    //         if (Object.keys(supplementObj.DailyMood).some(moodKey => ["1", "2", "3"].includes(moodKey))) {
    //             draft.data.supplementMap[key].DailyMood = {};
    //         }
    //     });
    // });

    const userToLoad: User = {
        name: cloudData.name,
        lastName: cloudData.lastName,
        age: cloudData.age,
        picture: !["dog", "mountain", "skyline" ].includes(cloudData.picture) ? "dog" : cloudData.picture,
        data: {
            supplementMap: cloudData.data.supplementMap,
            selectedDates: cloudData.data.selectedDates,
            waterGoal: !cloudData.data.waterGoal ? 2000 : cloudData.data.waterGoal,
            selectedUnits: !cloudData.data.selectedUnits ? "ml" : cloudData.data.selectedUnits
        },
        premiumStatus: cloudData.premiumStatus,
        achievements: cloudData.achievements,
        userAuthObj: userData.userAuthObj
    };
    console.log("GRABBING FROM CLOUD...");
    // const url = await grabProfilePictureFromCloud(userToLoad);
    // userToLoad.picture = url;
    saveUserToPhone(userToLoad);
    return userToLoad;
}
