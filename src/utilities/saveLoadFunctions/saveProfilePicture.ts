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
        })
        .catch((e) => console.log("uploading image error => ", e));
}

export async function grabProfilePictureFromCloud(userData: User) {
    const userCopy = { ...userData };
    
    firebase
        .storage()
        .ref(`profilePictures/${userData.userAuthObj?.uid}-profile-pic.png`)
        .getDownloadURL()
        .then((url) => {
            userCopy.uri = url;
            console.log(`${url} has been successfully downloaded.`);
            saveDataToCloud(userCopy);
        })
        .catch((e) => console.log("downloading image error => ", e));
}
