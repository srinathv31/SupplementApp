import firestore from "@react-native-firebase/firestore";
import User from "../../interfaces/User";
import { saveUserToPhone } from "./saveUserData";

export async function checkForCloudSave(uid: string) {
    const doesExist = (await firestore().collection("alpha-users").doc(uid).get()).exists;
    return doesExist;
}

export async function grabCloudSave(uid: string, userData: User) {

    const cloudData = (await firestore().collection("alpha-users").doc(uid).get()).data() as User;
    
    // TODO: use immer method
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

    // * Converting the mood object from the legacy to new mood object
    const fixedCloudData = { ...cloudData };
    Object.entries(fixedCloudData.data.supplementMap).forEach(([key, supplementObj]) => {
        // If DailyWater object doesn't exist, that means we have to set the new water object manually
        if (!supplementObj.DailyWater) {
            fixedCloudData.data.supplementMap[key].DailyWater = { completed: 0, goal: 2000 };
        }
        if (Object.keys(supplementObj.DailyMood).some(moodKey => ["1", "2", "3"].includes(moodKey))) {
            fixedCloudData.data.supplementMap[key].DailyMood = {};
        }
    });

    const userToLoad: User = {
        name: fixedCloudData.name,
        lastName: fixedCloudData.lastName,
        age: fixedCloudData.age,
        picture: !["dog", "mountain", "skyline" ].includes(fixedCloudData.picture) ? "dog" : fixedCloudData.picture,
        data: {
            supplementMap: fixedCloudData.data.supplementMap,
            selectedDates: fixedCloudData.data.selectedDates,
            waterGoal: !fixedCloudData.data.waterGoal ? 2000 : fixedCloudData.data.waterGoal,
            selectedUnits: !fixedCloudData.data.selectedUnits ? "ml" : fixedCloudData.data.selectedUnits
        },
        premiumStatus: fixedCloudData.premiumStatus,
        achievements: fixedCloudData.achievements,
        userAuthObj: userData.userAuthObj
    };
    console.log("GRABBING FROM CLOUD...");
    // const url = await grabProfilePictureFromCloud(userToLoad);
    // userToLoad.picture = url;
    saveUserToPhone(userToLoad);
    return userToLoad;
}
