import { firebase } from "@react-native-firebase/storage";
import User from "../../interfaces/User";
import { saveDataToCloud } from "./saveDataToCloud";

export function saveProfilePictureToCloud(userData: User, uploadUri: string, localImagePath: string){
    firebase
        .storage()
        .ref(`profilePictures/${userData.userAuthObj?.uid}-profile-pic.png`)
        .putFile(uploadUri)
        .then(() => {
        //You can check the image is now uploaded in the storage bucket
            console.log(`${localImagePath} has been successfully uploaded.`);
            saveDataToCloud(userData);
        })
        .catch((e) => console.log("uploading image error => ", e));
}

// Function is not being used currently, but will be used to grab user profile picture from cloud
export async function grabProfilePictureFromCloud(userData: User) {
    const userCopy = { ...userData };
    
    const url = firebase
        .storage()
        .ref(`profilePictures/${userData.userAuthObj?.uid}-profile-pic.png`)
        .getDownloadURL()
        .then((url) => {
            userCopy.picture = url;
            console.log("pic has been successfully downloaded.");
            return url;
        })
        .catch((e) => {
            console.log("downloading image error => ", e);
            return "";
        });
    return url;
}
