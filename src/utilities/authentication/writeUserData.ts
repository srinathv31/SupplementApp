import User from "../../interfaces/User";
import firestore from "@react-native-firebase/firestore";

export function createUserDataInCloud(userData: User) {

    firestore()
        .collection("alpha-users")
        .doc(""+userData.userAuthObj?.uid)
        .set({
            name: userData.name,
            lastName: userData.lastName,
            age: userData.age,
            picture: userData.picture,
            data: userData.data,
            premiumStatus: userData.premiumStatus,
            achievements: userData.achievements,
        })
        .then(() => {
            console.log("User added!");
        });
}
