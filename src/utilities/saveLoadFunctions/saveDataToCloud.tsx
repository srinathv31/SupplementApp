import firestore from "@react-native-firebase/firestore";
import User from "../../interfaces/User";

export function saveDataToCloud(userData: User) {
    firestore()
        .collection("alpha-users")
        .doc(""+userData.userAuthObj?.uid)
        .update({
            name: userData.name,
            lastName: userData.lastName,
            age: userData.age,
            picture: userData.picture,
            data: userData.data,
            premiumStatus: userData.premiumStatus,
            achievements: userData.achievements,
            uri: userData.uri
        })
        .then(() => {
            console.log("User updated!");
        });
}
